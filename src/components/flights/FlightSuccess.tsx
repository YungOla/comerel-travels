"use client";

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, Ticket, Calendar, Plane, ShieldCheck, CreditCard, ChevronRight } from "lucide-react";

export const FlightSuccess: React.FC = () => {
  const {
    myFlightBookings,
    setFlightStep,
    formatMoney,
    setActiveTab
  } = useApp();

  const [activeTab, setLocalTab] = useState<"bookings" | "visa">("bookings");

  const latestBooking = myFlightBookings[0];

  const handleReturnHome = () => {
    setFlightStep("search");
    setActiveTab("flights");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-burgundy to-burgundy-dark text-white rounded-2xl p-8 shadow-xl text-center mb-8 border border-gold/20">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
          <CheckCircle2 className="w-8 h-8 text-gold" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black font-serif">Booking Request Submitted</h1>
        {latestBooking && (
          <p className="text-xs text-gold-light mt-2 max-w-sm mx-auto font-black tracking-wider uppercase">
            Booking Reference ID: {latestBooking.ref}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Booking Details Card */}
        <div className="md:col-span-2 space-y-6">
          {latestBooking && (
            <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-6 text-sm font-semibold text-luxury-textPrimary">
              
              <div className="flex justify-between border-b border-luxury-border pb-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400">Flight Route</span>
                  <span className="text-base font-black flex items-center mt-1">
                    {latestBooking.flight.from.split(" ")[0]} → {latestBooking.flight.to.split(" ")[0]}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400">Status</span>
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase mt-1 ${
                    latestBooking.option === "pay_now"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {latestBooking.option === "pay_now" ? "Paid & Ticketed" : "Reserved / On Hold"}
                  </span>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-3 pb-4 border-b border-luxury-border">
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Airline Operator</span>
                  <span className="font-bold">{latestBooking.flight.airlineName} ({latestBooking.flight.flightNumber})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Cabin Category</span>
                  <span className="font-bold">{latestBooking.flight.cabin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Traveller Count</span>
                  <span className="font-bold">{latestBooking.passengers.length} Passenger(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Booking Date</span>
                  <span>{latestBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-textSecondary">Contact Email</span>
                  <span>{latestBooking.contact.email}</span>
                </div>
              </div>

              {/* Total price */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-luxury-textSecondary font-black uppercase text-[10px]">Total Amount</span>
                <span className="text-lg font-black text-burgundy">{formatMoney(latestBooking.amount)}</span>
              </div>

              {latestBooking.option === "hold" && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800 font-semibold leading-relaxed">
                  ⚠️ Note: Your ticket fare is held temporarily. A Comerel travel agent will dial you at {latestBooking.contact.phone} within 2 hours to confirm travel documentation and issue keys.
                </div>
              )}

            </div>
          )}

          {/* Simple customer tracker tabs */}
          <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden">
            <div className="flex border-b border-luxury-border bg-luxury-soft">
              <button
                onClick={() => setLocalTab("bookings")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  activeTab === "bookings"
                    ? "bg-white text-burgundy border-t-2 border-burgundy font-black"
                    : "text-luxury-textSecondary hover:text-burgundy"
                }`}
              >
                My Bookings Tracker ({myFlightBookings.length})
              </button>
              <button
                onClick={() => setLocalTab("visa")}
                className={`px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  activeTab === "visa"
                    ? "bg-white text-burgundy border-t-2 border-burgundy font-black"
                    : "text-luxury-textSecondary hover:text-burgundy"
                }`}
              >
                Track Visa Services
              </button>
            </div>

            <div className="p-6">
              {activeTab === "bookings" ? (
                <div className="space-y-4">
                  {myFlightBookings.length === 0 ? (
                    <p className="text-xs text-luxury-textSecondary">No bookings registered in this session.</p>
                  ) : (
                    myFlightBookings.map((b) => (
                      <div 
                        key={b.ref}
                        className="p-4 border border-luxury-border rounded-xl flex items-center justify-between hover:bg-luxury-soft/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-luxury-textPrimary uppercase tracking-wider flex items-center gap-1">
                            <Plane className="w-3.5 h-3.5 text-gold" />
                            <span>{b.flight.from.split(" ")[0]} → {b.flight.to.split(" ")[0]}</span>
                          </h4>
                          <p className="text-[10px] text-luxury-textSecondary font-semibold">
                            Ref: {b.ref} | {b.flight.airlineName} | {b.date}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="block text-xs font-black text-burgundy">
                            {formatMoney(b.amount)}
                          </span>
                          <span className={`text-[9px] uppercase tracking-wider font-extrabold ${
                            b.status === "Confirmed" ? "text-emerald-600" : "text-amber-500"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-4 text-xs font-semibold text-luxury-textSecondary">
                  <p>No active visa applications logged under this account.</p>
                  <p className="text-[10px] text-gray-400">
                    To start a visa application (Schengen, Gulf/UAE, US, UK, Canada), consult a Comerel advisor via the floating WhatsApp link or visit our corporate travel branch.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Column: Next Steps */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm text-center space-y-4">
            <h4 className="font-black text-luxury-textPrimary text-xs uppercase tracking-widest border-b border-luxury-border pb-3">
              Action Menu
            </h4>
            
            <div className="space-y-2">
              <button 
                onClick={() => alert("Downloading PDF confirmation keys...")}
                className="w-full py-2.5 border border-luxury-border hover:border-burgundy text-xs font-black rounded-lg uppercase tracking-wider transition-colors hover:bg-burgundy/5"
              >
                Download Receipt
              </button>
              <button 
                onClick={() => alert("Receipt dispatched to your email address.")}
                className="w-full py-2.5 border border-luxury-border hover:border-burgundy text-xs font-black rounded-lg uppercase tracking-wider transition-colors hover:bg-burgundy/5"
              >
                Email Confirmation
              </button>
              <button 
                onClick={() => alert("Details shared to WhatsApp.")}
                className="w-full py-2.5 border border-luxury-border hover:border-burgundy text-xs font-black rounded-lg uppercase tracking-wider transition-colors hover:bg-burgundy/5"
              >
                Share via WhatsApp
              </button>
            </div>

            <div className="border-t border-luxury-border pt-4">
              <button
                onClick={handleReturnHome}
                className="w-full py-3 bg-burgundy hover:bg-burgundy-light text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-md transition-colors"
              >
                Return to Search
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};
