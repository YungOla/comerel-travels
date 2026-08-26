"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { Star, MapPin, Phone, HelpCircle } from "lucide-react";

export const HotelDetailsView: React.FC = () => {
  const {
    hotelSearch,
    selectedHotel,
    setHotelStep,
    formatMoney
  } = useApp();

  if (!selectedHotel) return null;

  const totalCost = selectedHotel.pricePerNight * hotelSearch.nights * hotelSearch.rooms;
  const usdPrice = Math.round(selectedHotel.pricePerNight / 1600);

  const handleBookNow = () => {
    setHotelStep("rooms");
  };

  // Format dates elegantly for display
  const formatDateString = (dtStr: string) => {
    if (!dtStr) return "";
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dtStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Back button */}
      <button 
        onClick={() => setHotelStep("results")}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-burgundy hover:underline"
      >
        <span>← Back to Hotel Results</span>
      </button>

      {/* Header Info matching Frame 11 */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-luxury-textPrimary uppercase tracking-wide font-serif">
            {selectedHotel.name}
          </h2>
          <p className="text-xs text-luxury-textSecondary mt-1 flex items-center gap-1 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{selectedHotel.location}</span>
          </p>
        </div>
        
        <div className="flex flex-col md:items-end gap-1.5 text-xs text-luxury-textSecondary font-semibold">
          {/* Stars display */}
          <div className="flex items-center space-x-0.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star 
                key={idx}
                className={`w-3.5 h-3.5 ${
                  idx < selectedHotel.stars ? "text-gold fill-current" : "text-gray-200"
                }`} 
              />
            ))}
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px]">
            <Phone className="w-3 h-3 text-gold" />
            <span>00653440871</span>
          </span>
        </div>
      </div>

      {/* Collage Gallery Layout (Frame 11) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* Gallery Collage (Large image + 2x2 grid of smaller images) */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          
          {/* Main Large Image */}
          <div className="sm:col-span-2 h-72 sm:h-96 rounded-xl overflow-hidden bg-luxury-soft border border-luxury-border shadow-inner">
            <img 
              src={selectedHotel.gallery[0]} 
              alt={`${selectedHotel.name} 1`} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* 2x2 grid segment */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
            <div className="h-32 sm:h-[116px] rounded-lg overflow-hidden border border-luxury-border">
              <img src={selectedHotel.gallery[1]} alt="gallery 2" className="w-full h-full object-cover" />
            </div>
            <div className="h-32 sm:h-[116px] rounded-lg overflow-hidden border border-luxury-border">
              <img src={selectedHotel.gallery[2]} alt="gallery 3" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block h-[116px] rounded-lg overflow-hidden border border-luxury-border">
              <img src={selectedHotel.gallery[3]} alt="gallery 4" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>

        {/* Right Sticky Booking Sidebar matching Frame 11 */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-md sticky top-28 space-y-4 font-semibold text-xs text-luxury-textSecondary">
            
            {/* Price Header */}
            <div className="border-b border-luxury-border pb-3">
              <div className="flex items-baseline space-x-1">
                <span className="text-xl md:text-2xl font-black text-burgundy font-serif">
                  {formatMoney(selectedHotel.pricePerNight)}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">/ Per Night</span>
              </div>
              <span className="block text-[10px] text-luxury-textPrimary uppercase tracking-wider font-extrabold mt-1">
                1 X STANDARD DOUBLE
              </span>
            </div>

            {/* Total Stay info */}
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-lg font-black text-luxury-textPrimary">
                  {formatMoney(totalCost)}
                </span>
                <span className="text-[10px] text-gray-400">({hotelSearch.nights} Nights)</span>
              </div>
              <span className="block text-sm font-black text-burgundy font-serif">
                ${usdPrice * hotelSearch.nights}
              </span>
            </div>

            {/* Cancellation terms */}
            <div className="text-[10px] font-bold py-2 px-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg flex justify-between items-center">
              <span>Free Cancellation</span>
              <span>till 20 Aug 2026</span>
            </div>

            {/* Config Fields Grid */}
            <div className="border border-luxury-border/60 rounded-xl overflow-hidden divide-y divide-luxury-border">
              <div className="grid grid-cols-2 divide-x divide-luxury-border p-3 bg-luxury-soft/30">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-gray-400">Check-in</span>
                  <span className="text-luxury-textPrimary font-bold block mt-0.5">{formatDateString(hotelSearch.checkin)}</span>
                </div>
                <div className="pl-3">
                  <span className="block text-[9px] uppercase tracking-wider text-gray-400">Check-out</span>
                  <span className="text-luxury-textPrimary font-bold block mt-0.5">{formatDateString(hotelSearch.checkout)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 divide-x divide-luxury-border p-3 bg-luxury-soft/30">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-gray-400">Room</span>
                  <span className="text-luxury-textPrimary font-bold block mt-0.5">{hotelSearch.rooms} room</span>
                </div>
                <div className="pl-3">
                  <span className="block text-[9px] uppercase tracking-wider text-gray-400">Guests</span>
                  <span className="text-luxury-textPrimary font-bold block mt-0.5">{hotelSearch.adults} adults</span>
                </div>
              </div>
            </div>

            {/* Large Orange/Burgundy CTA button */}
            <button
              onClick={handleBookNow}
              className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-black rounded-lg uppercase tracking-widest text-xs transition-colors shadow-md hover:shadow-lg text-center"
            >
              BOOK NOW
            </button>

          </div>
        </aside>

      </div>

      {/* Description Paragraph Block matching Frame 11 */}
      <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-4">
        <h4 className="text-sm font-black text-luxury-textPrimary uppercase tracking-widest border-b border-luxury-border pb-3">
          Description
        </h4>
        <p className="text-xs md:text-sm text-luxury-textSecondary leading-relaxed font-semibold">
          {selectedHotel.description} This attractive property boasts convenient location just a 5-minute walk from the mesmerizing sea promenade and numerous local businesses, shops and lively nightlife. Avid divers will enjoy the richness of the nearby coral reefs and stunning beauty of the Red Sea coast. The cosy design and welcoming atmosphere combined with comfortable accommodation make this establishment a perfect place for a relaxing stay. The rooms are ample and are tastefully appointed to create welcoming surroundings in which to relax at the end of a long day of sunbathing or venturing into the area. Guests may dine on delicious dishes served at the hotel restaurant.
        </p>
      </div>

    </div>
  );
};
