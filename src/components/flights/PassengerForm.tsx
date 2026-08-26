"use client";

import React, { useState } from "react";
import { useApp, Passenger } from "../../context/AppContext";
import { Users, Mail, Phone, Calendar, Globe, BookOpen, CreditCard, Clock, Percent } from "lucide-react";

export const PassengerForm: React.FC = () => {
  const {
    selectedFlight,
    passengers,
    setPassengers,
    contactInfo,
    setContactInfo,
    bookingOption,
    setBookingOption,
    setFlightStep,
    addFlightBooking,
    formatMoney
  } = useApp();

  const [ffCollapsible, setFfCollapsible] = useState(false);
  const [frequentFlyer, setFrequentFlyer] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [confirmTerms, setConfirmTerms] = useState(false);

  // Contact country code
  const [countryCode, setCountryCode] = useState("Nigeria +234");

  if (!selectedFlight) return null;

  // Fare calculations
  const baseFare = selectedFlight.price * passengers.length;
  const taxes = Math.round(baseFare * 0.08); // 8% taxes
  const serviceFee = 15000 * passengers.length;
  let subTotal = baseFare + taxes + serviceFee;
  
  // Apply discount if promo is active
  if (promoApplied) {
    subTotal = Math.round(subTotal * 0.95); // 5% flat discount
  }

  const handleInputChange = (index: number, field: keyof Passenger, value: string) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleContactChange = (field: "email" | "phone", value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "FLIGHT5") {
      setPromoApplied(true);
      alert("Discount applied successfully! 5% discount credited to booking.");
    } else {
      alert("Invalid promo code. Use 'FLIGHT5' to test discounts.");
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Verification
    let valid = true;
    passengers.forEach((p) => {
      if (!p.firstName || !p.lastName || !p.passportNumber || !p.dob || !p.passportExpiry || !p.passportIssueDate) {
        valid = false;
      }
    });

    if (!contactInfo.email || !contactInfo.phone) {
      valid = false;
    }

    if (!valid) {
      alert("Please fill in all required traveller details, passport credentials, and contact coordinates.");
      return;
    }

    if (!confirmTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    const bookingRef = `CMF${Math.floor(100000 + Math.random() * 900000)}`;

    if (bookingOption === "pay_now") {
      // Replicate the payment checkout modal popup or step
      setFlightStep("payment");
    } else {
      // Direct hold confirmation (Book on Hold premium flow)
      addFlightBooking({
        ref: bookingRef,
        flight: selectedFlight,
        passengers,
        contact: contactInfo,
        amount: subTotal,
        option: "hold",
        status: "On Hold",
        date: new Date().toLocaleDateString()
      });
      alert(`Fare reserved! Reference code is ${bookingRef}. A consultant will reach you shortly.`);
      setFlightStep("success");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Back button */}
      <button 
        onClick={() => setFlightStep("details")}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-burgundy hover:underline"
      >
        <span>← Back to Flight Summary</span>
      </button>

      {/* Two Column Layout like Frame 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Passenger Forms */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleConfirmBooking} className="space-y-6">
            
            {passengers.map((passenger, index) => (
              <div key={index} className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden">
                <div className="bg-burgundy text-white py-3 px-4 flex justify-between items-center">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-wider">
                    Passenger Details - ADULT #{index + 1} (12+ YEARS)
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  {/* Title, First Name, Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Title *</label>
                      <select
                        value={passenger.title}
                        onChange={(e) => handleInputChange(index, "title", e.target.value)}
                        className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary focus:border-burgundy outline-none"
                      >
                        <option value="Mr">Mr.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="Ms">Ms.</option>
                        <option value="Dr">Dr.</option>
                      </select>
                    </div>

                    <div className="sm:col-span-1.5">
                      <label className="block text-xs font-bold text-gray-500 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={passenger.firstName}
                        onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
                        placeholder="Enter First Name"
                        className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary focus:border-burgundy outline-none"
                      />
                    </div>

                    <div className="sm:col-span-1.5">
                      <label className="block text-xs font-bold text-gray-500 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={passenger.lastName}
                        onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
                        placeholder="Enter Last Name"
                        className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary focus:border-burgundy outline-none"
                      />
                    </div>
                  </div>

                  {/* Passport Box */}
                  <div className="border border-luxury-border/60 rounded-xl p-4 bg-luxury-soft/30 space-y-4">
                    <h4 className="text-xs font-black text-burgundy uppercase tracking-wider flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-gold" />
                      <span>Passport Information</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-semibold text-luxury-textPrimary">
                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Nationality *</label>
                        <select
                          value={passenger.nationality}
                          onChange={(e) => handleInputChange(index, "nationality", e.target.value)}
                          className="w-full border border-luxury-border rounded p-2 bg-white text-[11px]"
                        >
                          <option value="Nigeria">Nigeria</option>
                          <option value="Egypt">Egypt</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Passport Number *</label>
                        <input
                          type="text"
                          required
                          value={passenger.passportNumber}
                          onChange={(e) => handleInputChange(index, "passportNumber", e.target.value)}
                          placeholder="Passport Number"
                          className="w-full border border-luxury-border rounded p-2 bg-white text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          required
                          value={passenger.dob}
                          onChange={(e) => handleInputChange(index, "dob", e.target.value)}
                          className="w-full border border-luxury-border rounded p-1.5 bg-white text-[10px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Issuing Date *</label>
                        <input
                          type="date"
                          required
                          value={passenger.passportIssueDate}
                          onChange={(e) => handleInputChange(index, "passportIssueDate", e.target.value)}
                          className="w-full border border-luxury-border rounded p-1.5 bg-white text-[10px]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Expiry Date *</label>
                        <input
                          type="date"
                          required
                          value={passenger.passportExpiry}
                          onChange={(e) => handleInputChange(index, "passportExpiry", e.target.value)}
                          className="w-full border border-luxury-border rounded p-1.5 bg-white text-[10px]"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}

            {/* Frequent Flyer collapsible */}
            <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setFfCollapsible(prev => !prev)}
                className="w-full bg-burgundy text-white py-3 px-4 flex justify-between items-center text-xs font-black uppercase tracking-wider"
              >
                <span>Frequent Flyer Number (Optional)</span>
                <span>{ffCollapsible ? "−" : "+"}</span>
              </button>

              {ffCollapsible && (
                <div className="p-4 bg-luxury-soft/50 border-t border-luxury-border/60">
                  <input
                    type="text"
                    value={frequentFlyer}
                    onChange={(e) => setFrequentFlyer(e.target.value)}
                    placeholder="Frequent flyer / membership account keys"
                    className="w-full border border-luxury-border rounded-lg p-2.5 bg-white text-xs outline-none focus:border-burgundy"
                  />
                </div>
              )}
            </div>

            {/* Contact Details box */}
            <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden">
              <div className="bg-burgundy text-white py-3 px-4 flex justify-between items-center text-xs font-black uppercase tracking-wider">
                <span>Enter Contact Details</span>
                <span className="text-[10px] lowercase text-gold">Sign in to book faster</span>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="sm:col-span-1 md:col-span-1.5">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      placeholder="Email"
                      className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold focus:border-burgundy outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Country Code</label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold focus:border-burgundy outline-none"
                    >
                      <option value="Nigeria +234">Nigeria +234</option>
                      <option value="United Kingdom +44">United Kingdom +44</option>
                      <option value="United States +1">United States +1</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={contactInfo.phone}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      placeholder="Mobile Number"
                      className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold focus:border-burgundy outline-none"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-red-500 italic">
                  Note: Your booking details will be sent to this email address and mobile number. It cannot be changed once booked.
                </p>
              </div>
            </div>

            {/* Payment Method Option Selector */}
            <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-4">
              <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-burgundy">
                Choose Booking Plan
              </h3>
              
              <div className="flex gap-8">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="bookingOption"
                    value="pay_now"
                    checked={bookingOption === "pay_now"}
                    onChange={() => setBookingOption("pay_now")}
                    className="text-burgundy focus:ring-burgundy w-4.5 h-4.5"
                  />
                  <span className="text-xs font-black text-luxury-textPrimary uppercase tracking-wider">
                    Pay Now
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="bookingOption"
                    value="hold"
                    checked={bookingOption === "hold"}
                    onChange={() => setBookingOption("hold")}
                    className="text-burgundy focus:ring-burgundy w-4.5 h-4.5"
                  />
                  <span className="text-xs font-black text-luxury-textPrimary uppercase tracking-wider">
                    Book On Hold (24-48 Hours Rate-Lock)
                  </span>
                </label>
              </div>

              {/* Terms Confirmation Checkbox */}
              <div className="pt-4 border-t border-luxury-border/60">
                <label className="flex items-start space-x-3 cursor-pointer text-xs font-semibold text-luxury-textSecondary">
                  <input 
                    type="checkbox"
                    checked={confirmTerms}
                    onChange={() => setConfirmTerms(prev => !prev)}
                    className="rounded text-burgundy focus:ring-burgundy w-4 h-4 mt-0.5"
                  />
                  <span>I confirm that I have read and accept the Privacy Policy, and Terms and condition of Comerel Travels.</span>
                </label>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
                >
                  {bookingOption === "pay_now" ? "Proceed to Checkout" : "Confirm Booking Hold"}
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Right Side: Fare Summary details */}
        <aside className="space-y-6">
          
          {/* Fare Summary Card */}
          <div className="bg-white rounded-xl border border-luxury-border p-6 shadow-sm space-y-4 text-xs font-semibold">
            <h3 className="text-xs md:text-sm font-black text-luxury-textPrimary uppercase tracking-wider border-b pb-3">
              Fare Summary
            </h3>

            <div className="space-y-2 border-b pb-4 text-luxury-textSecondary">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(baseFare)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 pl-2">
                <span>{passengers.length} ADT(s) (1 x {formatMoney(selectedFlight.price)})</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(taxes)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(serviceFee)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end font-semibold">
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">Grand Total</span>
                <span className="text-xl md:text-2xl font-black text-burgundy font-serif block mt-1">
                  {formatMoney(subTotal)}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-4 border-t border-luxury-border/60">
              <label className="block text-[10px] text-gray-450 mb-1">Enter Promo</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. FLIGHT5"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border border-luxury-border rounded-lg p-2 w-full text-xs font-semibold uppercase outline-none focus:border-burgundy"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-burgundy hover:bg-burgundy-light text-white font-black rounded-lg px-4 text-xs uppercase transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Campaign Discount Coupon */}
            <div className="bg-luxury-soft p-4 rounded-xl border border-luxury-border/60 flex items-center justify-between text-xs">
              <div className="space-y-0.5 pr-2">
                <span className="block font-black text-burgundy">Flight5 Code</span>
                <span className="block text-[10px] text-luxury-textSecondary">
                  Get Flat 5.00 % Discount on booking above ₦1,000.00
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPromoCode("FLIGHT5");
                  setPromoApplied(true);
                  alert("Coupon Code Flight5 selected!");
                }}
                className="border border-burgundy text-burgundy font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase hover:bg-burgundy hover:text-white transition-all"
              >
                Apply
              </button>
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
};
