"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Search, Loader2 } from "lucide-react";

export const HotelSearchLoader: React.FC = () => {
  const { hotelSearch, setHotelStep } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setHotelStep("results");
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 250);

    return () => clearInterval(progressInterval);
  }, [setHotelStep]);

  // Format dates elegantly for display
  const formatDateString = (dtStr: string) => {
    if (!dtStr) return "";
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dtStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/60 backdrop-blur-sm px-4 font-sans">
      <div className="bg-white rounded-2xl p-8 border border-luxury-border shadow-2xl w-full max-w-lg text-center relative overflow-hidden">
        
        {/* Animated Magnifying Glass / Search circular badge at top */}
        <div className="w-16 h-16 bg-luxury-soft rounded-full flex items-center justify-center mx-auto mb-6 border border-luxury-border relative">
          <Search className="w-6 h-6 text-burgundy animate-pulse" />
          <Loader2 className="w-10 h-10 text-gold absolute animate-spin opacity-50" />
        </div>

        {/* Modal Headline */}
        <h3 className="text-xl md:text-2xl font-black text-luxury-textPrimary font-serif mb-3">
          Searching for the Best Hotels
        </h3>

        {/* Destination Pill Badge */}
        <div className="inline-block bg-luxury-soft border border-luxury-border px-4 py-1.5 rounded-full text-xs font-bold text-luxury-textPrimary mb-6">
          <span className="text-gray-400 font-medium">Destination:</span> {hotelSearch.location}
        </div>

        {/* Check-in / Check-out Dates Info Grid */}
        <div className="grid grid-cols-2 gap-4 border border-luxury-border/60 rounded-xl p-4 bg-luxury-soft/50 max-w-sm mx-auto text-xs font-semibold text-luxury-textSecondary mb-4">
          <div className="text-left border-r border-luxury-border/60 pr-2">
            <span className="block text-[9px] uppercase tracking-wider text-gray-400 mb-0.5">Check In</span>
            <span className="text-luxury-textPrimary font-black block text-sm">
              {formatDateString(hotelSearch.checkin)}
            </span>
          </div>
          <div className="text-right pl-2">
            <span className="block text-[9px] uppercase tracking-wider text-gray-400 mb-0.5">Check Out</span>
            <span className="text-luxury-textPrimary font-black block text-sm">
              {formatDateString(hotelSearch.checkout)}
            </span>
          </div>
        </div>

        {/* Stay Duration label */}
        <div className="inline-flex items-center space-x-1 bg-burgundy/5 text-burgundy text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full mb-6">
          <span>🕒 {hotelSearch.nights} Nights</span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden max-w-sm mx-auto">
          <div 
            className="brand-gold-gradient h-full transition-all duration-300" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        
        {/* Footnote Message */}
        <p className="text-[10px] text-luxury-textSecondary mt-6 leading-relaxed font-semibold max-w-xs mx-auto">
          We are finding the best available hotels and rates for your stay. Please wait a few seconds...
        </p>

      </div>
    </div>
  );
};
