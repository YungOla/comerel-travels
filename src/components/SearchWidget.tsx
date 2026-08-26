"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Plane, Hotel, Calendar, Users, Award, Percent } from "lucide-react";

export const SearchWidget: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    flightSearch,
    setFlightSearch,
    setFlightStep,
    logFlightSearch,
    hotelSearch,
    setHotelSearch,
    setHotelStep,
    logHotelSearch
  } = useApp();

  const handleFlightSearch = () => {
    // Initiate search logging
    logFlightSearch(flightSearch.from, flightSearch.to);
    
    // Set step to loading screen
    setFlightStep("loading");
  };

  const handleHotelSearch = () => {
    // Initiate search logging
    logHotelSearch(hotelSearch.location);
    
    // Set step to loading screen
    setHotelStep("loading");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-25 mb-16">
      <div className="bg-white dark:bg-luxury-black rounded-2xl shadow-2xl p-6 md:p-8 border border-luxury-border">
        
        {/* Search Widget Tab Selectors */}
        <div className="flex space-x-2 border-b border-luxury-border pb-4 mb-6">
          <button 
            onClick={() => setActiveTab("flights")}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-xl text-xs md:text-sm font-black tracking-wider uppercase transition-all duration-300 ${
              activeTab === "flights" 
                ? "bg-burgundy text-white shadow-md" 
                : "bg-luxury-soft text-luxury-textSecondary hover:bg-gold/10 hover:text-burgundy"
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>Flights</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("hotels")}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-xl text-xs md:text-sm font-black tracking-wider uppercase transition-all duration-300 ${
              activeTab === "hotels" 
                ? "bg-burgundy text-white shadow-md" 
                : "bg-luxury-soft text-luxury-textSecondary hover:bg-gold/10 hover:text-burgundy"
            }`}
          >
            <Hotel className="w-4 h-4" />
            <span>Hotels</span>
          </button>
        </div>

        {/* FLIGHT SEARCH MODULE */}
        {activeTab === "flights" && (
          <div className="space-y-6 animate-fade-in">
            {/* Trip Type selection */}
            <div className="flex flex-wrap items-center gap-6">
              {["oneway", "roundtrip", "multicity"].map((t) => (
                <label key={t} className="flex items-center space-x-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="tripType"
                    value={t}
                    checked={flightSearch.type === t}
                    onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, type: e.target.value }))}
                    className="text-burgundy focus:ring-burgundy w-4 h-4 border-gray-300"
                  />
                  <span className="text-xs md:text-sm font-bold text-luxury-textPrimary uppercase tracking-wider group-hover:text-burgundy transition-colors">
                    {t === "oneway" ? "One Way" : t === "roundtrip" ? "Round Trip" : "Multi City"}
                  </span>
                </label>
              ))}
            </div>

            {/* Main Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2 flex items-center space-x-1">
                  <span>Flying From</span>
                </label>
                <select 
                  value={flightSearch.from}
                  onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, from: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                >
                  <option value="Lagos (LOS)">Lagos (LOS) - Murtala Muhammed</option>
                  <option value="Abuja (ABV)">Abuja (ABV) - Nnamdi Azikiwe</option>
                  <option value="London (LHR)">London (LHR) - Heathrow</option>
                  <option value="Dubai (DXB)">Dubai (DXB) - International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Flying To
                </label>
                <select 
                  value={flightSearch.to}
                  onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, to: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                >
                  <option value="Dubai (DXB)">Dubai (DXB) - International</option>
                  <option value="London (LHR)">London (LHR) - Heathrow</option>
                  <option value="Paris (CDG)">Paris (CDG) - Charles de Gaulle</option>
                  <option value="Lagos (LOS)">Lagos (LOS) - Murtala Muhammed</option>
                  <option value="Abuja (ABV)">Abuja (ABV) - Nnamdi Azikiwe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Departure Date
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={flightSearch.departDate}
                    onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, departDate: e.target.value }))}
                    className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                  />
                </div>
              </div>

              <div className={flightSearch.type === "oneway" ? "opacity-35 pointer-events-none" : ""}>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Return Date
                </label>
                <input 
                  type="date" 
                  disabled={flightSearch.type === "oneway"}
                  value={flightSearch.returnDate}
                  onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, returnDate: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                />
              </div>
            </div>

            {/* Cabin & Passenger Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end pt-2 border-t border-luxury-border/60">
              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Cabin Class
                </label>
                <select 
                  value={flightSearch.cabin}
                  onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, cabin: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business Class</option>
                  <option value="First">First Class</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Travellers
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max="9"
                  value={flightSearch.passengers}
                  onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, passengers: parseInt(e.target.value) || 1 }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Promo Code
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. COMERELVIP"
                  value={flightSearch.promo}
                  onChange={(e) => setFlightSearch((prev: any) => ({ ...prev, promo: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-semibold text-luxury-textPrimary outline-none focus:border-burgundy"
                />
              </div>

              <button 
                onClick={handleFlightSearch}
                className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-black rounded-lg uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm flex items-center justify-center space-x-2"
              >
                <span>Search Flights</span>
              </button>
            </div>
          </div>
        )}

        {/* HOTEL SEARCH MODULE */}
        {activeTab === "hotels" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Destination Location
                </label>
                <select 
                  value={hotelSearch.location}
                  onChange={(e) => setHotelSearch((prev: any) => ({ ...prev, location: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                >
                  <option value="Dubai (UAE)">Dubai (UAE)</option>
                  <option value="London (UK)">London (UK)</option>
                  <option value="Paris (France)">Paris (France)</option>
                  <option value="Lagos (Nigeria)">Lagos (Nigeria)</option>
                  <option value="New York (USA)">New York (USA)</option>
                  <option value="Istanbul (Turkey)">Istanbul (Turkey)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Check-in Date
                </label>
                <input 
                  type="date" 
                  value={hotelSearch.checkin}
                  onChange={(e) => setHotelSearch((prev: any) => ({ ...prev, checkin: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Check-out Date
                </label>
                <input 
                  type="date" 
                  value={hotelSearch.checkout}
                  onChange={(e) => setHotelSearch((prev: any) => ({ ...prev, checkout: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end pt-2 border-t border-luxury-border/60">
              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Number of Nights
                </label>
                <div className="w-full border border-luxury-border rounded-lg p-3 bg-gray-100 text-xs md:text-sm font-black text-luxury-textPrimary flex items-center justify-between">
                  <span>{hotelSearch.nights} Nights</span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Auto calculated</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Rooms & Guests
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <div>
                    <label className="block text-[8px] uppercase font-bold text-gray-400 mb-0.5">Adults</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={hotelSearch.adults}
                      onChange={(e) => setHotelSearch((prev: any) => ({ ...prev, adults: parseInt(e.target.value) || 1 }))}
                      className="w-full border border-luxury-border rounded p-1.5 bg-luxury-soft text-xs font-bold text-luxury-textPrimary"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase font-bold text-gray-400 mb-0.5">Child</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="10" 
                      value={hotelSearch.children}
                      onChange={(e) => setHotelSearch((prev: any) => ({ ...prev, children: parseInt(e.target.value) || 0 }))}
                      className="w-full border border-luxury-border rounded p-1.5 bg-luxury-soft text-xs font-bold text-luxury-textPrimary"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase font-bold text-gray-400 mb-0.5">Rooms</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="5" 
                      value={hotelSearch.rooms}
                      onChange={(e) => setHotelSearch((prev: any) => ({ ...prev, rooms: parseInt(e.target.value) || 1 }))}
                      className="w-full border border-luxury-border rounded p-1.5 bg-luxury-soft text-xs font-bold text-luxury-textPrimary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-burgundy uppercase tracking-widest mb-2">
                  Lead Guest Nationality
                </label>
                <select 
                  value={hotelSearch.nationality}
                  onChange={(e) => setHotelSearch((prev: any) => ({ ...prev, nationality: e.target.value }))}
                  className="w-full border border-luxury-border rounded-lg p-3 bg-luxury-soft text-xs md:text-sm font-bold text-luxury-textPrimary outline-none focus:border-burgundy"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Egypt">Egypt</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Turkey">Turkey</option>
                </select>
              </div>

              <button 
                onClick={handleHotelSearch}
                className="w-full py-4 bg-burgundy hover:bg-burgundy-light text-white font-black rounded-lg uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm flex items-center justify-center space-x-2"
              >
                <span>Search Hotels</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
