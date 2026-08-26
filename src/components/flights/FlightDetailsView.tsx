"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { ArrowRight, Plane, Briefcase, FileText, CheckCircle, Info } from "lucide-react";

export const FlightDetailsView: React.FC = () => {
  const {
    flightSearch,
    selectedFlight,
    setFlightStep,
    formatMoney
  } = useApp();

  if (!selectedFlight) return null;

  // Fare calculations
  const baseFare = selectedFlight.price;
  const taxes = Math.round(baseFare * 0.08); // 8% taxes
  const serviceFee = 15000; // Fixed Service fee
  const grandTotal = baseFare + taxes + serviceFee;

  const handleContinue = () => {
    setFlightStep("passenger");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      
      {/* Back Button */}
      <button 
        onClick={() => setFlightStep("results")}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-burgundy hover:underline"
      >
        <span>← Back to Search Results</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Flight Details Summary Card */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-luxury-border p-6 shadow-sm space-y-6">
            
            <div className="border-b border-luxury-border pb-4">
              <span className="text-[10px] text-gold font-black uppercase tracking-widest block">
                Itinerary Review
              </span>
              <h2 className="text-xl md:text-2xl font-black text-luxury-textPrimary mt-1 flex items-center space-x-2 font-serif">
                <span>{selectedFlight.from.split(" ")[0]}</span>
                <ArrowRight className="w-5 h-5 text-gold" />
                <span>{selectedFlight.to.split(" ")[0]}</span>
              </h2>
              <p className="text-xs text-luxury-textSecondary mt-1 font-semibold">
                Cabin Class: <span className="text-luxury-textPrimary font-bold">{selectedFlight.cabin}</span>
              </p>
            </div>

            {/* Route Timeline Card */}
            <div className="border border-luxury-border/60 rounded-xl p-4 bg-luxury-soft/50 space-y-4">
              <div className="flex justify-between items-center text-xs font-black text-burgundy uppercase tracking-wider pb-2 border-b border-luxury-border/40">
                <span className="flex items-center space-x-1.5">
                  <Plane className="w-3.5 h-3.5 text-gold" />
                  <span>Outbound flight • {selectedFlight.airlineName}</span>
                </span>
                <span>{selectedFlight.flightNumber}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Departure</span>
                  <span className="block text-base font-black text-luxury-textPrimary mt-1">{selectedFlight.departTime}</span>
                  <span className="block text-xs text-luxury-textSecondary font-semibold mt-0.5">{selectedFlight.from}</span>
                  <span className="block text-[9px] text-gray-450 mt-1">Terminal 2D</span>
                </div>
                
                <div className="flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] text-luxury-textSecondary font-bold">{selectedFlight.duration}</span>
                  <div className="w-full h-[1px] bg-luxury-border/75 my-2"></div>
                  <span className="text-[9px] text-burgundy font-extrabold uppercase tracking-wide">
                    {selectedFlight.stops === 0 ? "Direct / Non-stop" : `${selectedFlight.stops} Stop (${selectedFlight.stopover})`}
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Arrival</span>
                  <span className="block text-base font-black text-luxury-textPrimary mt-1">{selectedFlight.arrivalTime}</span>
                  <span className="block text-xs text-luxury-textSecondary font-semibold mt-0.5">{selectedFlight.to}</span>
                  <span className="block text-[9px] text-gray-450 mt-1">Terminal B</span>
                </div>
              </div>
            </div>

            {/* Baggage & Refund details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-luxury-textSecondary">
              <div className="flex items-start space-x-3 bg-luxury-soft p-4 rounded-xl border border-luxury-border/60">
                <Briefcase className="w-4 h-4 text-gold mt-0.5" />
                <div>
                  <span className="block font-black text-luxury-textPrimary text-xs uppercase tracking-wider">Baggage Allowance</span>
                  <span className="block text-xs mt-1">Cabin Luggage: 1 piece (Max 8kg)</span>
                  <span className="block text-xs">Checked Baggage: {selectedFlight.baggage} included</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-luxury-soft p-4 rounded-xl border border-luxury-border/60">
                <FileText className="w-4 h-4 text-gold mt-0.5" />
                <div>
                  <span className="block font-black text-luxury-textPrimary text-xs uppercase tracking-wider">Fare Terms</span>
                  <span className="block text-xs mt-1">Type: {selectedFlight.fareType}</span>
                  <span className={`block text-xs font-bold mt-0.5 ${
                    selectedFlight.refundability === "Refundable" ? "text-emerald-650" : "text-amber-600"
                  }`}>
                    Status: {selectedFlight.refundability}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3 text-xs text-amber-800 font-medium leading-relaxed">
              <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p>
                Please verify that your passport is valid for at least 6 months beyond your planned return date. Citizens of Nigeria require a pre-arranged entry visa for this route.
              </p>
            </div>

          </div>
        </div>

        {/* Right: Sticky Fare Summary Card */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-luxury-border p-6 shadow-md sticky top-28 space-y-4">
            <h3 className="text-xs md:text-sm font-black text-luxury-textPrimary uppercase tracking-wider border-b border-luxury-border pb-3">
              Fare Summary
            </h3>
            
            <div className="text-xs font-semibold text-luxury-textSecondary space-y-2.5 pb-4 border-b border-luxury-border">
              <div className="flex justify-between">
                <span>Base Fare (1 Adult)</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(baseFare)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Airport Surcharges</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(taxes)}</span>
              </div>
              <div className="flex justify-between">
                <span>Local Aggregator Service Fee</span>
                <span className="text-luxury-textPrimary font-bold">{formatMoney(serviceFee)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end font-semibold pt-1">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-gray-400">Total Price</span>
                <span className="block text-2xl font-black text-burgundy font-serif mt-1">
                  {formatMoney(grandTotal)}
                </span>
                <span className="block text-[8px] text-gray-450 mt-0.5">VAT & local charges inclusive</span>
              </div>
            </div>

            <button 
              onClick={handleContinue}
              className="w-full py-4 bg-gradient-to-r from-burgundy to-gold hover:from-burgundy-light hover:to-gold-dark text-white font-black rounded-lg uppercase tracking-widest text-xs transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Continue
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
};
