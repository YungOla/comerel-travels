"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Hotel } from "../../utils/mockData";
import { 
  SlidersHorizontal, MapPin, Star, Heart, ArrowRight,
  Wifi, ShieldAlert, BadgeInfo, CheckCircle, Navigation,
  Coffee, Compass, ShieldCheck, HelpCircle, Sparkles, AlertCircle
} from "lucide-react";

export const HotelResults: React.FC = () => {
  const {
    hotelSearch,
    hotelResults,
    setHotelStep,
    setSelectedHotel,
    formatMoney,
    currency
  } = useApp();

  // Filters State
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [nameSearch, setNameSearch] = useState("");
  const [starFilters, setStarFilters] = useState<Record<number, boolean>>({
    5: true,
    4: true,
    3: true,
    2: true,
    1: true
  });
  const [freeCancellationOnly, setFreeCancellationOnly] = useState(false);
  
  const [amenitiesFilters, setAmenitiesFilters] = useState<Record<string, boolean>>({
    wifi: false,
    pool: false,
    gym: false,
    spa: false,
    restaurant: false,
    shuttle: false,
    parking: false
  });

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Dynamic price limits
  const priceLimits = useMemo(() => {
    if (hotelResults.length === 0) return { min: 32000, max: 1600000 };
    const prices = hotelResults.map((h) => h.pricePerNight);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [hotelResults]);

  const handleResetFilters = () => {
    setMaxPrice(priceLimits.max);
    setNameSearch("");
    setStarFilters({ 5: true, 4: true, 3: true, 2: true, 1: true });
    setFreeCancellationOnly(false);
    setAmenitiesFilters({
      wifi: false,
      pool: false,
      gym: false,
      spa: false,
      restaurant: false,
      shuttle: false,
      parking: false
    });
  };

  const toggleWishlist = (hotelId: string) => {
    setWishlist(prev => ({ ...prev, [hotelId]: !prev[hotelId] }));
  };

  // Filter Logic
  const filteredHotels = useMemo(() => {
    return hotelResults.filter((hotel) => {
      // Name filter
      if (nameSearch && !hotel.name.toLowerCase().includes(nameSearch.toLowerCase())) return false;

      // Price filter
      if (hotel.pricePerNight > maxPrice) return false;

      // Star rating filter
      if (!starFilters[hotel.stars]) return false;

      // Free cancellation
      if (freeCancellationOnly && !hotel.freeCancellation) return false;

      // Amenities filter
      for (const [key, value] of Object.entries(amenitiesFilters)) {
        if (value && !hotel.amenitiesList.includes(key)) {
          return false;
        }
      }

      return true;
    });
  }, [hotelResults, nameSearch, maxPrice, starFilters, freeCancellationOnly, amenitiesFilters]);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setHotelStep("details");
  };

  // Helper to map amenity strings to Lucide icons
  const renderAmenityIcon = (am: string) => {
    switch (am.toLowerCase()) {
      case "wifi":
        return <span title="WiFi"><Wifi className="w-3.5 h-3.5 text-gray-500" /></span>;
      case "pool":
        return <span className="text-xs text-gray-500 select-none cursor-help" title="Swimming Pool">🏊</span>;
      case "gym":
        return <span className="text-xs text-gray-500 select-none cursor-help" title="Fitness Centre">🏋️</span>;
      case "parking":
        return <span className="text-xs text-gray-500 select-none cursor-help" title="Parking">🚗</span>;
      case "restaurant":
        return <span className="text-xs text-gray-500 select-none cursor-help" title="Restaurant">🍽️</span>;
      case "spa":
        return <span className="text-xs text-gray-500 select-none cursor-help" title="Spa">💆</span>;
      case "shuttle":
        return <span className="text-xs text-gray-500 select-none cursor-help" title="Shuttle">🚐</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Top Search Info matches Frame 9 & 10 */}
      <div className="bg-white rounded-xl border border-luxury-border p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-burgundy/10 p-3 rounded-lg text-burgundy">
            <span className="text-xl">🏨</span>
          </div>
          <div>
            <h2 className="font-black text-luxury-textPrimary text-base md:text-lg">{hotelSearch.location}</h2>
            <p className="text-xs text-luxury-textSecondary mt-0.5 font-semibold">
              Check-In: <span className="text-luxury-textPrimary font-bold">{hotelSearch.checkin}</span> | 
              Check-Out: <span className="text-luxury-textPrimary font-bold">{hotelSearch.checkout}</span> | 
              Room: <span className="text-luxury-textPrimary font-bold">{hotelSearch.rooms}</span> | 
              Adults: <span className="text-luxury-textPrimary font-bold">{hotelSearch.adults}</span> | 
              Child: <span className="text-luxury-textPrimary font-bold">{hotelSearch.children}</span>
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setHotelStep("search")}
          className="px-5 py-2.5 border border-burgundy text-burgundy text-xs font-black rounded-lg uppercase tracking-wider hover:bg-burgundy hover:text-white transition-colors"
        >
          Modify Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-6">
            
            <div className="flex justify-between items-center border-b border-luxury-border pb-4">
              <h3 className="text-xs md:text-sm font-black text-luxury-textPrimary uppercase tracking-wider">
                Filter
              </h3>
              <button 
                onClick={handleResetFilters}
                className="bg-burgundy text-white hover:bg-burgundy-light rounded text-[10px] px-2.5 py-1 font-black uppercase tracking-wider transition-all"
              >
                Reset All
              </button>
            </div>

            {/* Price slider matching Frame 9 */}
            <div className="space-y-3 pb-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Price
              </label>
              <div className="flex justify-between items-center text-xs font-bold text-luxury-textPrimary">
                <span>{formatMoney(priceLimits.min)}</span>
                <span>{formatMoney(maxPrice)}</span>
              </div>
              <input 
                type="range" 
                min={priceLimits.min} 
                max={priceLimits.max} 
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value) || priceLimits.max)}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Stars rating checkboxes */}
            <div className="space-y-3 py-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Star Rating
              </label>
              <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-bold text-luxury-textPrimary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setStarFilters(prev => ({ ...prev, [star]: !prev[star] }))}
                    className={`p-2 border rounded-lg transition-all ${
                      starFilters[star]
                        ? "bg-burgundy text-white border-burgundy"
                        : "border-luxury-border bg-luxury-soft text-luxury-textSecondary hover:bg-gold/5"
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Name search field */}
            <div className="space-y-2 py-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Hotel Name
              </label>
              <input 
                type="text" 
                placeholder="Hotel name" 
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft text-xs font-semibold text-luxury-textPrimary outline-none focus:border-burgundy"
              />
            </div>

            {/* Amenities checkbox checklist */}
            <div className="space-y-3 py-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Amenities
              </label>
              <div className="space-y-2 text-xs font-semibold text-luxury-textPrimary">
                {Object.keys(amenitiesFilters).map((am) => (
                  <label key={am} className="flex items-center space-x-2.5 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={amenitiesFilters[am]}
                      onChange={() => setAmenitiesFilters(prev => ({ ...prev, [am]: !prev[am] }))}
                      className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                    />
                    <span className="uppercase text-[10px] tracking-wide">
                      {am === "shuttle" ? "Airport Shuttle" : am === "roomservice" ? "Room Service" : am}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Free Cancellation checkbox */}
            <div className="space-y-3 py-6 border-b border-luxury-border">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400">
                Hotel Free Cancellation
              </label>
              <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-luxury-textPrimary">
                <input 
                  type="checkbox" 
                  checked={freeCancellationOnly}
                  onChange={() => setFreeCancellationOnly(prev => !prev)}
                  className="rounded text-burgundy focus:ring-burgundy w-4 h-4"
                />
                <span>Free Cancellation</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Hotel Result Cards */}
        <section className="lg:col-span-3 space-y-4">
          
          {/* Header filters */}
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
            <span>
              <span className="text-burgundy text-sm font-black">{filteredHotels.length}</span> Hotels found
            </span>

            <div className="flex gap-2 text-[10px]">
              <select className="border border-luxury-border rounded px-2 py-1 bg-white outline-none">
                <option>Name</option>
              </select>
              <select className="border border-luxury-border rounded px-2 py-1 bg-white outline-none">
                <option>Star</option>
              </select>
              <select className="border border-luxury-border rounded px-2 py-1 bg-white outline-none">
                <option>Price</option>
              </select>
            </div>
          </div>

          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-xl border border-luxury-border p-12 text-center text-luxury-textSecondary">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gold" />
              <h3 className="font-bold text-sm text-luxury-textPrimary">No Properties Match Filters</h3>
              <p className="text-xs mt-1">Please expand your search values or adjust the price range slider.</p>
              <button 
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-burgundy text-white font-bold rounded-lg text-xs uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredHotels.map((hotel) => {
              const usdPrice = Math.round(hotel.pricePerNight / 1600);
              
              return (
                <div 
                  key={hotel.id}
                  className="bg-white border border-luxury-border rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col sm:flex-row relative"
                >
                  {/* Left Thumbnail */}
                  <div className="w-full sm:w-60 h-48 sm:h-auto relative overflow-hidden bg-luxury-soft">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
                    />
                    
                    {/* Wishlist indicator */}
                    <button 
                      onClick={() => toggleWishlist(hotel.id)}
                      className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors z-10"
                    >
                      <Heart className={`w-3.5 h-3.5 ${wishlist[hotel.id] ? "text-red-500 fill-current" : "text-gray-500"}`} />
                    </button>
                  </div>

                  {/* Center & Right Details */}
                  <div className="flex-1 p-5 flex flex-col justify-between sm:flex-row gap-6">
                    
                    {/* Left Center info */}
                    <div className="space-y-2 flex-grow">
                      <h4 className="text-base font-black text-luxury-textPrimary leading-tight uppercase font-serif">
                        {hotel.name}
                      </h4>
                      
                      {/* Rating stars display matching Frame 9 */}
                      <div className="flex items-center space-x-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx}
                            className={`w-3 h-3 ${
                              idx < hotel.stars ? "text-gold fill-current" : "text-gray-200"
                            }`} 
                          />
                        ))}
                      </div>

                      <span className="block text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">
                        {hotel.area}
                      </span>

                      {/* Amenities checklist icons */}
                      <div className="flex items-center gap-2 pt-2">
                        {hotel.amenitiesList.map((am) => (
                          <div 
                            key={am}
                            className="p-1.5 bg-luxury-soft border border-luxury-border rounded-lg"
                          >
                            {renderAmenityIcon(am)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Center pricing & CTA */}
                    <div className="w-full sm:w-36 flex sm:flex-col items-start sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-luxury-border/60 pt-4 sm:pt-0">
                      <div className="sm:text-right">
                        <span className="block font-black text-lg md:text-xl text-luxury-textPrimary">
                          {formatMoney(hotel.pricePerNight)}
                        </span>
                        <span className="block text-[10px] text-gray-400 font-semibold mt-0.5">
                          ${usdPrice} Avg / Night
                        </span>
                        <span className={`block text-[9px] font-bold uppercase mt-1 ${
                          hotel.freeCancellation ? "text-emerald-650" : "text-red-500"
                        }`}>
                          {hotel.freeCancellation ? "Free Cancellation" : "Non Refundable"}
                        </span>
                      </div>

                      <button 
                        onClick={() => handleSelectHotel(hotel)}
                        className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-black rounded-lg uppercase tracking-wider transition-colors shadow-md mt-4"
                      >
                        Book
                      </button>
                    </div>

                  </div>

                </div>
              );
            })
          )}

        </section>

      </div>
    </div>
  );
};
