"use client";

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CreditCard, FileCheck, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";

export const HotelCheckout: React.FC = () => {
  const {
    selectedHotel,
    selectedRoom,
    hotelSearch,
    leadGuest,
    setLeadGuest,
    specialRequests,
    setSpecialRequests,
    hotelPromoCode,
    setHotelPromoCode,
    hotelPaymentMethod,
    setHotelPaymentMethod,
    setHotelStep,
    addHotelReservation,
    formatMoney
  } = useApp();

  const [paymentOption, setPaymentOption] = useState<"card" | "transfer">("card");
  
  // Billing details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  if (!selectedHotel || !selectedRoom) return null;

  // Cost calculations
  const roomTotal = selectedRoom.pricePerNight * hotelSearch.nights * hotelSearch.rooms;
  const taxes = Math.round(roomTotal * 0.12); // 12% hotel tax
  const grandTotal = roomTotal + taxes;

  const handleInputChange = (field: keyof typeof leadGuest, value: string) => {
    setLeadGuest((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadGuest.firstName || !leadGuest.lastName || !leadGuest.email || !leadGuest.phone) {
      alert("Please enter lead guest credentials.");
      return;
    }

    if (hotelPaymentMethod === "pay_now" && paymentOption === "card") {
      if (!cardName || !cardNumber || !cardCvv) {
        alert("Please enter payment billing credentials.");
        return;
      }
    }

    const reservationRef = `CMH${Math.floor(100000 + Math.random() * 900000)}`;

    addHotelReservation({
      ref: reservationRef,
      hotel: selectedHotel,
      room: selectedRoom,
      leadGuest,
      specialRequests,
      nights: hotelSearch.nights,
      roomsCount: hotelSearch.rooms,
      amount: grandTotal,
      paymentMethod: hotelPaymentMethod,
      status: hotelPaymentMethod === "pay_now" ? "Confirmed" : "Confirmed", // In both, reservation is processed
      date: new Date().toLocaleDateString()
    });

    if (hotelPaymentMethod === "pay_now") {
      alert(`Payment of ${formatMoney(grandTotal)} successful! Your hotel voucher has been generated.`);
    } else {
      alert(`Room reserved on hold! Payment is due at ${selectedHotel.name} during check-in.`);
    }

    setHotelStep("confirmation");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      
      {/* Back button */}
      <button 
        onClick={() => setHotelStep("facilities")}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-burgundy hover:underline"
      >
        <span>← Back to Facilities Directory</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Guest Form details */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            
            {/* Lead guest information */}
            <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-4">
              <div className="border-b border-luxury-border pb-3">
                <h3 className="text-lg font-black text-luxury-textPrimary font-serif">Lead Guest Information</h3>
                <p className="text-xs text-luxury-textSecondary mt-1 font-semibold">
                  Specify details where voucher keys and receipts will be delivered.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">First Name *</label>
                  <input 
                    type="text" 
                    required
                    value={leadGuest.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="First Name"
                    className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary focus:border-burgundy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Last Name *</label>
                  <input 
                    type="text" 
                    required
                    value={leadGuest.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Last Name"
                    className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary focus:border-burgundy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={leadGuest.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary focus:border-burgundy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={leadGuest.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Phone number"
                    className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary focus:border-burgundy"
                  />
                </div>
              </div>
            </div>

            {/* Special requests & Promo */}
            <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-4 text-xs font-bold text-luxury-textPrimary">
              <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-luxury-textPrimary">Special Requests & Promo</h3>
              
              <div>
                <label className="block text-gray-500 mb-1.5">Requests (Early checkin, late checkout, pickup, dietary, etc.)</label>
                <textarea 
                  rows={3} 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Type any dietary/bedding requests..."
                  className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft font-semibold outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-gray-500 mb-1.5">Promo Voucher Code</label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Voucher code"
                    value={hotelPromoCode}
                    onChange={(e) => setHotelPromoCode(e.target.value)}
                    className="border border-luxury-border rounded-l-lg p-2.5 bg-luxury-soft w-full text-xs font-semibold focus:border-burgundy outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => alert("Promo code applied successfully.")}
                    className="bg-burgundy text-white hover:bg-burgundy-light rounded-r-lg px-4 text-xs font-black uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-4">
              <h3 className="text-xs md:text-sm font-black text-luxury-textPrimary uppercase tracking-wider">Payment Settings</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Pay now option */}
                <label 
                  className={`border-2 rounded-xl p-5 cursor-pointer relative block transition-all ${
                    hotelPaymentMethod === "pay_now" 
                      ? "border-burgundy bg-burgundy/[0.02]" 
                      : "border-luxury-border hover:border-burgundy/60"
                  }`}
                >
                  <input 
                    type="radio" 
                    name="hotelPaymentMethod"
                    value="pay_now"
                    checked={hotelPaymentMethod === "pay_now"}
                    onChange={() => setHotelPaymentMethod("pay_now")}
                    className="text-burgundy w-4 h-4 absolute top-4 right-4"
                  />
                  <span className="block text-sm font-black text-luxury-textPrimary uppercase tracking-wider">Pay Now</span>
                  <span className="block text-[10px] text-luxury-textSecondary mt-2 leading-relaxed">
                    Pay securely online using Cards, Paystack or Bank Transfer to generate instant checkout keys.
                  </span>
                </label>

                {/* Pay at hotel option */}
                <label 
                  className={`border-2 rounded-xl p-5 cursor-pointer relative block transition-all ${
                    hotelPaymentMethod === "pay_at_hotel" 
                      ? "border-gold bg-gold/[0.02]" 
                      : "border-luxury-border hover:border-gold/60"
                  }`}
                >
                  <input 
                    type="radio" 
                    name="hotelPaymentMethod"
                    value="pay_at_hotel"
                    checked={hotelPaymentMethod === "pay_at_hotel"}
                    onChange={() => setHotelPaymentMethod("pay_at_hotel")}
                    className="text-gold w-4 h-4 absolute top-4 right-4"
                  />
                  <span className="block text-sm font-black text-luxury-textPrimary uppercase tracking-wider">Pay At Hotel</span>
                  <span className="block text-[10px] text-emerald-650 font-black uppercase mt-2">
                    Reserve room instantly, pay during your stay check-in directly at hotel lobby.
                  </span>
                </label>

              </div>

              {/* Conditional Card details for Pay Now */}
              {hotelPaymentMethod === "pay_now" && (
                <div className="border border-luxury-border rounded-xl p-4 bg-luxury-soft/50 space-y-4 text-xs font-bold text-luxury-textPrimary">
                  <div className="flex justify-between items-center pb-2 border-b border-luxury-border/60">
                    <span className="flex items-center space-x-1.5 uppercase tracking-wider">
                      <CreditCard className="w-4 h-4 text-gold" />
                      <span>Card Details</span>
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-gray-500">Cardholder Name *</label>
                      <input 
                        type="text" 
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full border border-luxury-border rounded-lg p-2.5 bg-white outline-none focus:border-burgundy font-semibold"
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
                        className="w-full border border-luxury-border rounded-lg p-2.5 bg-white outline-none focus:border-burgundy font-semibold"
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
                          className="w-full border border-luxury-border rounded-lg p-2.5 bg-white outline-none focus:border-burgundy font-semibold"
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
                          className="w-full border border-luxury-border rounded-lg p-2.5 bg-white outline-none focus:border-burgundy font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <button
              type="submit"
              className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-black rounded-lg uppercase tracking-widest text-xs md:text-sm shadow-md hover:shadow-lg transition-colors"
            >
              Complete Reservation
            </button>

          </form>
        </div>

        {/* Right Sidebar Booking Summary */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-luxury-border p-6 shadow-md sticky top-28 space-y-4 text-xs font-semibold text-luxury-textSecondary">
            
            <h3 className="text-xs md:text-sm font-black text-luxury-textPrimary uppercase tracking-wider border-b border-luxury-border pb-3 flex items-center space-x-1.5">
              <FileCheck className="w-4 h-4 text-gold" />
              <span>Booking Summary</span>
            </h3>

            {/* Hotel info */}
            <div className="pb-3 border-b border-luxury-border space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Property</span>
              <span className="text-luxury-textPrimary font-black block">
                {selectedHotel.name}
              </span>
              <span className="text-[10px] block">
                {selectedHotel.location.split(",")[0]}
              </span>
            </div>

            {/* Room info */}
            <div className="pb-3 border-b border-luxury-border space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Selected Room</span>
              <span className="text-luxury-textPrimary font-black block">
                {selectedRoom.name}
              </span>
              <span className="text-[10px] text-emerald-650 block">
                {selectedRoom.mealPlan}
              </span>
            </div>

            {/* Schedule */}
            <div className="pb-3 border-b border-luxury-border">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Stay Schedule</span>
              <div className="text-luxury-textPrimary font-bold flex justify-between items-center mt-1">
                <span>In: {hotelSearch.checkin}</span>
                <span>→</span>
                <span>Out: {hotelSearch.checkout}</span>
              </div>
              <span className="block mt-1 text-[10px]">
                {hotelSearch.nights} Night(s), {hotelSearch.rooms} Room(s)
              </span>
            </div>

            {/* Cost Breakup */}
            <div className="space-y-2 pb-4 border-b border-luxury-border text-luxury-textSecondary">
              <div className="flex justify-between">
                <span>Room Rate ({hotelSearch.nights} nights)</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(roomTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Hotel Surcharges & Taxes (12%)</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(taxes)}</span>
              </div>
            </div>

            {/* Total Cost */}
            <div className="flex justify-between items-end font-semibold">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-bold">Total Stay Cost</span>
                <span className="text-xl font-black text-burgundy font-serif block mt-1">
                  {formatMoney(grandTotal)}
                </span>
                <span className="block text-[8px] text-gray-405 mt-0.5">Taxes & fees inclusive</span>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};
