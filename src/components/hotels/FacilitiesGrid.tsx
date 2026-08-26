"use client";

import React from "react";
import { useApp } from "../../context/AppContext";

export const FacilitiesGrid: React.FC = () => {
  const { selectedHotel, setHotelStep } = useApp();

  if (!selectedHotel) return null;

  // Exact facilities checklist from Frame 13 mockup
  const facilityItems = [
    "Small pets allowed (under 5 kg) (Extra charge)",
    "Small pets allowed (under 5 kg) not available in all rooms (Extra charge)",
    "NO Wheelchair-accessible",
    "Car park",
    "24-hour reception",
    "Check-in hour",
    "Check-out hour",
    "Wi-fi",
    "Airport Shuttle (Extra charge)",
    "Room service",
    "24-hour security",
    "Lift access",
    "Supermarket (Extra charge)",
    "Terrace",
    "Towels and bed linen",
    "Restaurant",
    "Smoking area",
    "Rooftop bar (Extra charge)",
    "Printer (Extra charge)",
    "Photocopier (Extra charge)",
    "Breakfast",
    "Breakfast served to the table",
    "À la carte dinner (Extra charge)"
  ];

  const handleProceed = () => {
    setHotelStep("checkout");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      
      {/* Back button */}
      <button 
        onClick={() => setHotelStep("rooms")}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-burgundy hover:underline"
      >
        <span>← Back to Room Selection</span>
      </button>

      {/* Facilities Container matching Frame 13 layout */}
      <div className="bg-white border border-luxury-border rounded-xl shadow-sm overflow-hidden">
        
        {/* Banner Title */}
        <div className="bg-burgundy text-white py-3.5 px-6 font-black uppercase tracking-wider text-xs md:text-sm">
          Hotel Facilities
        </div>

        <div className="p-6 space-y-8">
          
          {/* Grid Layout of checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {facilityItems.map((item, index) => (
              <div 
                key={index} 
                className="p-3.5 bg-luxury-soft rounded-lg border border-luxury-border flex items-start space-x-3 text-xs"
              >
                {/* Checked Blue icon matching mockup (styled as brand gold or burgundy check) */}
                <div className="w-4 h-4 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0 text-burgundy font-black mt-0.5 select-none text-[10px]">
                  ✓
                </div>
                <span className="font-semibold text-luxury-textPrimary text-[11px] leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="text-center pt-6 border-t border-luxury-border/60">
            <button 
              onClick={handleProceed}
              className="px-8 py-3.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-md hover:shadow-lg transition-colors"
            >
              Proceed to Guest Details
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
