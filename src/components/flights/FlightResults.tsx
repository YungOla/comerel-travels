"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Flight } from "../../utils/mockData";
import { SlidersHorizontal, ArrowRight, ShieldCheck, HelpCircle, Briefcase, RefreshCw } from "lucide-react";

export const FlightResults: React.FC = () => {
  const {
    flightSearch,
    flightResults,
    setFlightStep,
    setSelectedFlight,
    formatMoney
  } = useApp();

  // Filters state
  const [maxPrice, setMaxPrice] = useState(2500000);
  const [stops, setStops] = useState({
    direct: true,
    oneStop: true,
    twoStops: true
  });
  const [airlines, setAirlines] = useState<Record<string, boolean>>({
    "Emirates": true,
    "Qatar Airways": true,
    "British Airways": true,
    "Lufthansa": true,
    "Air France": true,
    "Turkish Airlines": true,
    "Ethiopian Airlines": true,
    "Air Peace": true,
    "United Nigeria": true,
    "Ibom Air": true
  });
  const [refundability, setRefundability] = useState({
    refundable: true,
    nonRefundable: true
  });

  // Calculate price limits dynamically from results
  const priceRangeLimits = useMemo(() => {
    if (flightResults.length === 0) return { min: 50000, max: 2000000 };
    const prices = flightResults.map((f) => f.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [flightResults]);

  // Handle resets
  const handleResetFilters = () => {
    setMaxPrice(priceRangeLimits.max);
    setStops({ direct: true, oneStop: true, twoStops: true });
    setRefundability({ refundable: true, nonRefundable: true });
    const resetAirlines: Record<string, boolean> = {};
    Object.keys(airlines).forEach(key => {
      resetAirlines[key] = true;
    });
    setAirlines(resetAirlines);
  };

  // Filtered Flights List
  const filteredFlights = useMemo(() => {
    return flightResults.filter((flight) => {
      // Price Filter
      if (flight.price > maxPrice) return false;

      // Stops Filter
      if (flight.stops === 0 && !stops.direct) return false;
      if (flight.stops === 1 && !stops.oneStop) return false;
      if (flight.stops >= 2 && !stops.twoStops) return false;

      // Airline Filter
      if (!airlines[flight.airlineName]) return false;

      // Refundability
      if (flight.refundability === "Refundable" && !refundability.refundable) return false;
      if (flight.refundability === "Non-Refundable" && !refundability.nonRefundable) return false;

      // Filter by matching cabin class from search query
      if (flight.cabin !== flightSearch.cabin) return false;

      return true;
    });
  }, [flightResults, maxPrice, stops, airlines, refundability, flightSearch.cabin]);

  const handleBookFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setFlightStep("details");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Top Navigation / Summary Bar */}
      <div className="bg-white rounded-xl border border-luxury-border p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-burgundy/10 p-3 rounded-lg text-burgundy">
            <span className="text-xl">✈️</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-luxury-textPrimary text-base md:text-lg">{flightSearch.from}</span>
              <ArrowRight className="w-4 h-4 text-gold" />
              <span className="font-black text-luxury-textPrimary text-base md:text-lg">{flightSearch.to}</span>
            </div>
            <p className="text-xs text-luxury-textSecondary mt-0.5 font-semibold">
              Depart Date: <span className="text-luxury-textPrimary font-bold">{flightSearch.departDate}</span> | 
              Cabin: <span className="text-luxury-textPrimary font-bold">{flightSearch.cabin}</span> | 
              Passengers: <span className="text-luxury-textPrimary font-bold">{flightSearch.passengers} Adult(s)</span>
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setFlightStep("search")}
          className="px-5 py-2.5 border border-burgundy text-burgundy text-xs font-black rounded-lg uppercase tracking-wider hover:bg-burgundy hover:text-white transition-all duration-300"
        >
          Modify Search
        </button>
      </div>

      {/* Main Grid: Filters & Flight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm">
            <div className="flex justify-between items-center border-b border-luxury-border pb-4 mb-6">
              <h3 className="text-xs md:text-sm font-black text-luxury-textPrimary uppercase tracking-wider flex items-center space-x-1.5">
                <SlidersHorizontal className="w-4 h-4 text-gold" />
                <span>Filters</span>
              </h3>
              <button 
                onClick={handleResetFilters}
                className="text-xs font-bold text-burgundy hover:underline flex items-center space-x-1"
              >
                <span>Reset All</span>
              </button>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pb-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Max Price
              </label>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-400">{formatMoney(priceRangeLimits.min)}</span>
                <span className="text-burgundy text-sm">{formatMoney(maxPrice)}</span>
              </div>
              <input 
                type="range" 
                min={priceRangeLimits.min} 
                max={priceRangeLimits.max} 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value) || priceRangeLimits.max)}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Stops Filter */}
            <div className="space-y-3 py-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Stops
              </label>
              <div className="space-y-2.5 text-xs font-semibold text-luxury-textPrimary">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={stops.direct}
                    onChange={() => setStops(prev => ({ ...prev, direct: !prev.direct }))}
                    className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                  />
                  <span>Non-stop / Direct</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={stops.oneStop}
                    onChange={() => setStops(prev => ({ ...prev, oneStop: !prev.oneStop }))}
                    className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                  />
                  <span>1 Stop</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={stops.twoStops}
                    onChange={() => setStops(prev => ({ ...prev, twoStops: !prev.twoStops }))}
                    className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                  />
                  <span>2+ Stops</span>
                </label>
              </div>
            </div>

            {/* Airlines Filter */}
            <div className="space-y-3 py-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Airlines
              </label>
              <div className="space-y-2.5 text-xs font-semibold text-luxury-textPrimary max-h-56 overflow-y-auto pr-1">
                {Object.keys(airlines).map((airline) => (
                  <label key={airline} className="flex items-center space-x-2.5 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={airlines[airline]}
                      onChange={() => setAirlines(prev => ({ ...prev, [airline]: !prev[airline] }))}
                      className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                    />
                    <span>{airline}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Refundability */}
            <div className="space-y-3 pt-6">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Refundability
              </label>
              <div className="space-y-2.5 text-xs font-semibold text-luxury-textPrimary">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={refundability.refundable}
                    onChange={() => setRefundability(prev => ({ ...prev, refundable: !prev.refundable }))}
                    className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                  />
                  <span>Refundable Flights</span>
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={refundability.nonRefundable}
                    onChange={() => setRefundability(prev => ({ ...prev, nonRefundable: !prev.nonRefundable }))}
                    className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                  />
                  <span>Non-refundable Flights</span>
                </label>
              </div>
            </div>

          </div>
        </aside>

        {/* Flight Cards Section */}
        <section className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest px-2">
            <span>
              Available Flights: <span className="text-burgundy text-sm font-black">{filteredFlights.length}</span>
            </span>
            <span>Sorted By Price</span>
          </div>

          {filteredFlights.length === 0 ? (
            <div className="bg-white rounded-xl border border-luxury-border p-12 text-center text-luxury-textSecondary">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gold/60" />
              <h3 className="font-bold text-sm text-luxury-textPrimary">No Flights Match Your Filter Criteria</h3>
              <p className="text-xs mt-1">Try resetting the sliders, checking airline options, or modifying query dates.</p>
              <button 
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-burgundy text-white font-bold rounded-lg text-xs uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFlights.map((flight) => (
              <div 
                key={flight.id} 
                className="bg-white border border-luxury-border rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden p-6 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Airline Name & Logo */}
                <div className="flex items-center space-x-4 w-full md:w-48">
                  <div className="w-12 h-12 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy font-black text-sm border border-gold/15">
                    {flight.airlineLogoCode}
                  </div>
                  <div>
                    <h4 className="font-black text-luxury-textPrimary text-sm md:text-base leading-tight">
                      {flight.airlineName}
                    </h4>
                    <span className="text-[10px] text-luxury-textSecondary font-bold">
                      {flight.flightNumber} • {flight.cabin}
                    </span>
                  </div>
                </div>

                {/* Departure & Arrival Schedule */}
                <div className="flex-grow flex items-center justify-between max-w-md w-full text-center">
                  <div className="text-left">
                    <span className="block font-black text-base md:text-lg text-luxury-textPrimary">
                      {flight.departTime}
                    </span>
                    <span className="text-[10px] text-luxury-textSecondary uppercase font-extrabold tracking-wider">
                      {flight.from.split("(")[1]?.replace(")", "") || flight.from}
                    </span>
                  </div>

                  <div className="flex-1 px-4 relative flex flex-col items-center">
                    <span className="text-[10px] text-luxury-textSecondary font-bold mb-1">
                      {flight.duration}
                    </span>
                    
                    {/* Line graphics */}
                    <div className="w-full h-[2px] bg-luxury-border relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold"></div>
                    </div>
                    
                    <span className="text-[9px] text-burgundy font-extrabold uppercase mt-1">
                      {flight.stops === 0 ? "Non-stop" : `${flight.stops} Stop (${flight.stopover})`}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="block font-black text-base md:text-lg text-luxury-textPrimary">
                      {flight.arrivalTime}
                    </span>
                    <span className="text-[10px] text-luxury-textSecondary uppercase font-extrabold tracking-wider">
                      {flight.to.split("(")[1]?.replace(")", "") || flight.to}
                    </span>
                  </div>
                </div>

                {/* Baggage & Refund details */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-36 gap-2 text-[10px] font-bold text-luxury-textSecondary">
                  <span className="flex items-center space-x-1 bg-luxury-soft px-2 py-1 rounded border border-luxury-border">
                    <Briefcase className="w-3.5 h-3.5 text-gold" />
                    <span>Checked {flight.baggage}</span>
                  </span>
                  <span className={`px-2 py-1 rounded border ${
                    flight.refundability === "Refundable" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                      : "bg-gray-50 text-gray-500 border-gray-150"
                  }`}>
                    {flight.refundability}
                  </span>
                </div>

                {/* Pricing & CTA */}
                <div className="text-center md:text-right border-t md:border-t-0 border-luxury-border/60 pt-4 md:pt-0 w-full md:w-32 flex md:flex-col items-center md:items-end justify-between md:justify-center">
                  <div>
                    <span className="block text-[9px] text-gray-400 font-extrabold uppercase">Base Price</span>
                    <span className="block font-black text-xl text-burgundy">
                      {formatMoney(flight.price)}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleBookFlight(flight)}
                    className="px-5 py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-black rounded-lg uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Book Flight
                  </button>
                </div>

              </div>
            ))
          )}

        </section>

      </div>
    </div>
  );
};
