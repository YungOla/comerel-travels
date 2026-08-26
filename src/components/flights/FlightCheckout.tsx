"use client";

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CreditCard, ShieldCheck, Clock, FileCheck, PhoneCall } from "lucide-react";

export const FlightCheckout: React.FC = () => {
  const {
    selectedFlight,
    passengers,
    contactInfo,
    bookingOption,
    setBookingOption,
    setFlightStep,
    addFlightBooking,
    formatMoney
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "paystack">("card");
  
  // Card Inputs
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Hold Inputs
  const [holdName, setHoldName] = useState(passengers[0] ? `${passengers[0].firstName} ${passengers[0].lastName}`.trim() : "");
  const [holdEmail, setHoldEmail] = useState(contactInfo.email || "");
  const [holdPhone, setHoldPhone] = useState(contactInfo.phone || "");

  if (!selectedFlight) return null;

  // Pricing
  const baseFare = selectedFlight.price * passengers.length;
  const taxes = Math.round(baseFare * 0.08);
  const serviceFee = 15000 * passengers.length;
  const grandTotal = baseFare + taxes + serviceFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingRef = `CMF${Math.floor(100000 + Math.random() * 900000)}`;

    if (bookingOption === "pay_now") {
      if (paymentMethod === "card") {
        if (!cardName || !cardNumber || !cardCvv) {
          alert("Please fill in card billing details.");
          return;
        }
      }
      
      // Confirm paid booking
      addFlightBooking({
        ref: bookingRef,
        flight: selectedFlight,
        passengers,
        contact: contactInfo,
        amount: grandTotal,
        option: "pay_now",
        status: "Confirmed",
        date: new Date().toLocaleDateString()
      });
      alert("Payment successful! Your ticket has been issued.");
    } else {
      if (!holdName || !holdEmail || !holdPhone) {
        alert("Please provide contact details to reserve this fare on hold.");
        return;
      }

      // Add held booking
      addFlightBooking({
        ref: bookingRef,
        flight: selectedFlight,
        passengers,
        contact: { email: holdEmail, phone: holdPhone },
        amount: grandTotal,
        option: "hold",
        status: "On Hold",
        date: new Date().toLocaleDateString()
      });
      alert(`Fare reserved! Your booking reference is ${bookingRef}. A consultant will contact you shortly.`);
    }

    setFlightStep("success");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Back button */}
      <button 
        onClick={() => setFlightStep("passenger")}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-burgundy hover:underline"
      >
        <span>← Back to Passengers Form</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Checkout Panel */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Option Selector Toggle */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setBookingOption("pay_now")}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-350 relative ${
                bookingOption === "pay_now"
                  ? "border-burgundy bg-burgundy/[0.03]"
                  : "border-luxury-border bg-white hover:border-burgundy/60"
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-black text-luxury-textPrimary text-sm uppercase tracking-wider">Pay Now</h4>
                <CreditCard className={`w-4 h-4 ${bookingOption === "pay_now" ? "text-burgundy" : "text-gray-400"}`} />
              </div>
              <p className="text-[10px] text-luxury-textSecondary mt-2 leading-relaxed">
                Complete payment securely online to issue instant flight tickets via email.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setBookingOption("hold")}
              className={`p-4 border-2 rounded-xl text-left transition-all duration-350 relative ${
                bookingOption === "hold"
                  ? "border-gold bg-gold/[0.03]"
                  : "border-luxury-border bg-white hover:border-gold/60"
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-black text-luxury-textPrimary text-sm uppercase tracking-wider">Book On Hold</h4>
                <Clock className={`w-4 h-4 ${bookingOption === "hold" ? "text-gold" : "text-gray-400"}`} />
              </div>
              <p className="text-[10px] text-luxury-textSecondary mt-2 leading-relaxed">
                Reserve the fare temporarily for 24-48 hours. A consultant will handle ticket issuance.
              </p>
            </button>
          </div>

          <form onSubmit={handleCheckoutSubmit} className="space-y-6">
            
            {/* Pay Now Checkout Flow */}
            {bookingOption === "pay_now" && (
              <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-6">
                <div className="border-b border-luxury-border pb-3 flex justify-between items-center">
                  <h3 className="text-sm font-black text-luxury-textPrimary uppercase tracking-widest flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Secure Checkout</span>
                  </h3>
                </div>

                {/* Sub payment toggle */}
                <div className="flex flex-wrap gap-3">
                  {["card", "transfer", "paystack"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method as any)}
                      className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all duration-200 uppercase ${
                        paymentMethod === method
                          ? "bg-burgundy text-white border-burgundy"
                          : "border-luxury-border text-luxury-textSecondary bg-luxury-soft hover:bg-gold/5"
                      }`}
                    >
                      {method === "card" ? "Debit / Credit Card" : method === "transfer" ? "Bank Transfer" : "Flutterwave / Paystack"}
                    </button>
                  ))}
                </div>

                {/* Card Fields */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 text-xs font-bold text-luxury-textPrimary">
                    <div>
                      <label className="block mb-1 text-gray-500">Cardholder Name *</label>
                      <input 
                        type="text" 
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-burgundy font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-gray-500">Card Number *</label>
                      <input 
                        type="text" 
                        required
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-burgundy font-semibold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-gray-500">Expiry Date *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-burgundy font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-gray-500">CVV *</label>
                        <input 
                          type="password" 
                          required
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="000"
                          className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-burgundy font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Transfer fields */}
                {paymentMethod === "transfer" && (
                  <div className="p-4 bg-luxury-soft rounded-lg border border-luxury-border space-y-3 text-xs">
                    <p className="font-bold text-luxury-textPrimary">Please transfer the total amount to the Comerel Travels account below:</p>
                    <div className="font-mono text-gray-600 bg-white p-3 rounded border space-y-1">
                      <div>Bank: **Access Bank Plc**</div>
                      <div>Account Number: **0124595202**</div>
                      <div>Account Name: **Comerel Travels Ltd**</div>
                    </div>
                    <p className="text-[10px] text-gray-400">Tickets will be processed immediately upon transfer validation. Please send receipt keys to billing@comereltravels.com.</p>
                  </div>
                )}

                {/* Flutterwave/Paystack */}
                {paymentMethod === "paystack" && (
                  <div className="p-4 bg-luxury-soft rounded-lg border border-luxury-border text-center text-xs text-luxury-textSecondary">
                    <p>You will be redirected to the secure gateway (Paystack / Flutterwave) to finalize payment.</p>
                  </div>
                )}

              </div>
            )}

            {/* Book On Hold Premium Flow */}
            {bookingOption === "hold" && (
              <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-6">
                <div className="border-b border-luxury-border pb-3 flex justify-between items-center">
                  <h3 className="text-sm font-black text-gold uppercase tracking-widest flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-gold" />
                    <span>Fare Lock Reservation</span>
                  </h3>
                </div>

                <div className="p-4 bg-gold/5 border border-gold/20 rounded-xl text-xs text-gold-dark font-semibold leading-relaxed">
                  Your fare is reserved temporarily for <span className="font-black text-burgundy">24–48 Hours</span>. A Comerel travel consultant will contact you shortly to validate travel eligibility and secure ticket issuance.
                </div>

                <div className="space-y-4 text-xs font-bold text-luxury-textPrimary">
                  <div>
                    <label className="block mb-1 text-gray-500">Contact Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={holdName}
                      onChange={(e) => setHoldName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-gold font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-500">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={holdEmail}
                      onChange={(e) => setHoldEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-gold font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-500">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={holdPhone}
                      onChange={(e) => setHoldPhone(e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-gold font-semibold"
                    />
                  </div>
                </div>

              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-black rounded-lg uppercase tracking-widest text-xs md:text-sm shadow-md hover:shadow-lg transition-colors"
            >
              {bookingOption === "pay_now" ? "Pay and Issue Ticket" : "Reserve Fare & Request Callback"}
            </button>

          </form>
        </div>

        {/* Right Sidebar Booking Summary */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-luxury-border p-6 shadow-md sticky top-28 space-y-4 text-xs font-semibold">
            
            <h3 className="text-xs md:text-sm font-black text-luxury-textPrimary uppercase tracking-wider border-b border-luxury-border pb-3 flex items-center space-x-1.5">
              <FileCheck className="w-4 h-4 text-gold" />
              <span>Booking Summary</span>
            </h3>

            {/* Flight summary */}
            <div className="pb-3 border-b border-luxury-border space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Flight</span>
              <span className="text-luxury-textPrimary font-black block">
                {selectedFlight.airlineName} ({selectedFlight.flightNumber})
              </span>
              <span className="text-[10px] text-luxury-textSecondary block">
                {selectedFlight.from.split(" ")[0]} → {selectedFlight.to.split(" ")[0]}
              </span>
            </div>

            {/* Travellers count */}
            <div className="pb-3 border-b border-luxury-border">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Travellers</span>
              <span className="text-luxury-textPrimary font-black">
                {passengers.length} Adult(s) ({selectedFlight.cabin})
              </span>
            </div>

            {/* Cost Breakup */}
            <div className="space-y-2 pb-4 border-b border-luxury-border text-luxury-textSecondary">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(baseFare)}</span>
              </div>
              <div className="flex justify-between">
                <span>Airport Taxes</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(taxes)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(serviceFee)}</span>
              </div>
            </div>

            {/* Total Cost */}
            <div className="flex justify-between items-end font-semibold">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Total Cost</span>
                <span className="text-xl font-black text-burgundy font-serif block mt-1">
                  {formatMoney(grandTotal)}
                </span>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};
