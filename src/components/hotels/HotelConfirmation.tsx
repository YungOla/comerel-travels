"use client";

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, Award, Calendar, Home, ArrowRight, ShieldCheck, Mail, Printer } from "lucide-react";

export const HotelConfirmation: React.FC = () => {
  const {
    myHotelReservations,
    setHotelStep,
    formatMoney,
    setActiveTab
  } = useApp();

  const [activeTab, setLocalTab] = useState<"reservations" | "settings">("reservations");

  const latestRes = myHotelReservations[0];

  const handleReturnHome = () => {
    setHotelStep("search");
    setActiveTab("hotels");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      
      {/* Success Banner */}
      <div className="bg-gradient-to-br from-burgundy to-burgundy-dark text-white rounded-2xl p-8 shadow-xl text-center mb-8 border border-gold/20">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
          <CheckCircle2 className="w-8 h-8 text-gold" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black font-serif">Hotel Booking Confirmed</h1>
        {latestRes && (
          <p className="text-xs text-gold-light mt-2 max-w-sm mx-auto font-black tracking-wider uppercase">
            Reservation Voucher Ref: {latestRes.ref}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Voucher Summary Card */}
        <div className="md:col-span-2 space-y-6">
          {latestRes && (
            <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-6 text-sm font-semibold text-luxury-textPrimary">
              
              <div className="flex justify-between border-b border-luxury-border pb-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400">Hotel Property</span>
                  <span className="text-base font-black flex items-center mt-1">
                    {latestRes.hotel.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400">Booking Status</span>
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase mt-1 ${
                    latestRes.paymentMethod === "pay_now"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-gold/10 text-gold-dark border border-gold/25"
                  }`}>
                    {latestRes.paymentMethod === "pay_now" ? "Paid / Voucher Active" : "Confirmed / Pay at Hotel"}
                  </span>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-3 pb-4 border-b border-luxury-border">
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Room Category</span>
                  <span className="font-bold">{latestRes.room.name} ({latestRes.room.mealPlan})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Rooms Reserved</span>
                  <span className="font-bold">{latestRes.roomsCount} Room(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Stay Duration</span>
                  <span className="font-bold">{latestRes.nights} Nights</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Lead Guest</span>
                  <span className="font-bold">{latestRes.leadGuest.firstName} {latestRes.leadGuest.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Contact coordinates</span>
                  <span>{latestRes.leadGuest.phone}</span>
                </div>
              </div>

              {/* Total price */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-luxury-textSecondary font-black uppercase text-[10px]">Total Stay Cost</span>
                <span className="text-lg font-black text-burgundy">{formatMoney(latestRes.amount)}</span>
              </div>

              {latestRes.paymentMethod === "pay_at_hotel" && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-150 text-xs text-emerald-800 font-semibold leading-relaxed">
                  📢 Note: Your booking has been secured! Room voucher keys will be active at check-in lobby. Payment is due at the hotel desk upon arrival in cash or card.
                </div>
              )}

            </div>
          )}

          {/* Simple customer reservations tracker */}
          <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden">
            <div className="flex border-b border-luxury-border bg-luxury-soft">
              <button
                onClick={() => setLocalTab("reservations")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  activeTab === "reservations"
                    ? "bg-white text-burgundy border-t-2 border-burgundy font-black"
                    : "text-luxury-textSecondary hover:text-burgundy"
                }`}
              >
                My Reservations ({myHotelReservations.length})
              </button>
            </div>

            <div className="p-6">
              {activeTab === "reservations" && (
                <div className="space-y-4">
                  {myHotelReservations.length === 0 ? (
                    <p className="text-xs text-luxury-textSecondary">No reservations logged in this session.</p>
                  ) : (
                    myHotelReservations.map((res) => (
                      <div 
                        key={res.ref}
                        className="p-4 border border-luxury-border rounded-xl flex items-center justify-between hover:bg-luxury-soft/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-luxury-textPrimary uppercase tracking-wider flex items-center gap-1.5">
                            <span>🏨</span>
                            <span>{res.hotel.name}</span>
                          </h4>
                          <p className="text-[10px] text-luxury-textSecondary font-semibold">
                            Ref: {res.ref} | {res.room.name} | {res.nights} Nights | {res.date}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="block text-xs font-black text-burgundy">
                            {formatMoney(res.amount)}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-extrabold ${
                            res.paymentMethod === "pay_now" ? "text-emerald-600" : "text-gold-dark"
                          }`}>
                            {res.paymentMethod === "pay_now" ? "Pre-Paid" : "Pay at Hotel"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Column: Actions */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm text-center space-y-4">
            <h4 className="font-black text-luxury-textPrimary text-xs uppercase tracking-widest border-b border-luxury-border pb-3">
              Voucher Actions
            </h4>
            
            <div className="space-y-2">
              <button 
                onClick={() => alert("Downloading voucher PDF keys...")}
                className="w-full py-2.5 border border-luxury-border hover:border-burgundy text-xs font-black rounded-lg uppercase tracking-wider transition-colors hover:bg-burgundy/5 flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-gold" />
                <span>Download Voucher</span>
              </button>
              <button 
                onClick={() => alert("Voucher keys dispatched via email.")}
                className="w-full py-2.5 border border-luxury-border hover:border-burgundy text-xs font-black rounded-lg uppercase tracking-wider transition-colors hover:bg-burgundy/5 flex items-center justify-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-gold" />
                <span>Email Voucher</span>
              </button>
              <button 
                onClick={() => alert("Shared to WhatsApp.")}
                className="w-full py-2.5 border border-luxury-border hover:border-burgundy text-xs font-black rounded-lg uppercase tracking-wider transition-colors hover:bg-burgundy/5 flex items-center justify-center space-x-1.5"
              >
                <span>Share via WhatsApp</span>
              </button>
            </div>

            <div className="border-t border-luxury-border pt-4">
              <button
                onClick={handleReturnHome}
                className="w-full py-3 bg-burgundy hover:bg-burgundy-light text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-md transition-colors"
              >
                Book Another Hotel
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};
