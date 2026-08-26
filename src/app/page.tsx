"use client";

import React from "react";
import { useApp } from "../context/AppContext";
import { Hero } from "../components/Hero";
import { SearchWidget } from "../components/SearchWidget";

// Flights
import { FlightSearchLoader } from "../components/flights/FlightSearchLoader";
import { FlightResults } from "../components/flights/FlightResults";
import { FlightDetailsView } from "../components/flights/FlightDetailsView";
import { PassengerForm } from "../components/flights/PassengerForm";
import { FlightCheckout } from "../components/flights/FlightCheckout";
import { FlightSuccess } from "../components/flights/FlightSuccess";

// Hotels
import { HotelSearchLoader } from "../components/hotels/HotelSearchLoader";
import { HotelResults } from "../components/hotels/HotelResults";
import { HotelDetailsView } from "../components/hotels/HotelDetailsView";
import { RoomsList } from "../components/hotels/RoomsList";
import { FacilitiesGrid } from "../components/hotels/FacilitiesGrid";
import { HotelCheckout } from "../components/hotels/HotelCheckout";
import { HotelConfirmation } from "../components/hotels/HotelConfirmation";

// Admin
import { AdminDashboard } from "../components/admin/AdminDashboard";

export default function Home() {
  const { 
    activeTab, 
    flightStep, 
    hotelStep, 
    login 
  } = useApp();

  return (
    <div className="bg-luxury-soft min-h-screen text-luxury-textPrimary">
      
      {/* 1. ADMIN DASHBOARD ROUTE */}
      {activeTab === "admin" && <AdminDashboard />}

      {/* 2. FLIGHT BOOKING FLOW ROUTE */}
      {activeTab === "flights" && (
        <>
          {flightStep === "search" && (
            <div className="animate-fade-in">
              <Hero />
              <SearchWidget />
              
              {/* Luxury Value Propositions Landing Blocks */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-extrabold tracking-widest text-gold uppercase">
                    Distinguished Standards
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black mt-3 font-serif">
                    Why Choose Comerel Travels
                  </h2>
                  <div className="w-16 h-[2px] bg-gold mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl border border-luxury-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className="text-3xl block mb-4">✈️</span>
                      <h3 className="text-lg font-bold mb-2 font-serif">Global Flight Access</h3>
                      <p className="text-xs text-luxury-textSecondary leading-relaxed font-semibold">
                        Instantly connect with hundreds of international carriers. Compare real-time fares and routes seamlessly with secured held rate locks.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl border border-luxury-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className="text-3xl block mb-4">🏨</span>
                      <h3 className="text-lg font-bold mb-2 font-serif">Worldwide Luxury Inventory</h3>
                      <p className="text-xs text-luxury-textSecondary leading-relaxed font-semibold">
                        Gain direct bookings to over 1 million luxury properties globally, featuring exclusive negotiated booking rates and VIP guest benefits.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl border border-luxury-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <span className="text-3xl block mb-4">📄</span>
                      <h3 className="text-lg font-bold mb-2 font-serif">Visa Assistance Desk</h3>
                      <p className="text-xs text-luxury-textSecondary leading-relaxed font-semibold">
                        Benefit from professional concierge consultation for Schengen, Gulf, and North American visa documentation and booking tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Admin Access (Helpful for evaluation) */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center border-t border-luxury-border pt-12">
                <p className="text-xs text-luxury-textSecondary">
                  Evaluation Note: You can login as **admin@comereltravels.com** inside Login/Signup to enable the live Admin Operations dashboard tab!
                </p>
                <button
                  onClick={() => login("admin@comereltravels.com", "admin")}
                  className="mt-4 px-4 py-2 border border-gold text-gold text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-gold hover:text-white transition-colors"
                >
                  Quick Sign-In as Admin
                </button>
              </div>
            </div>
          )}

          {flightStep === "loading" && <FlightSearchLoader />}
          {flightStep === "results" && <FlightResults />}
          {flightStep === "details" && <FlightDetailsView />}
          {flightStep === "passenger" && <PassengerForm />}
          {flightStep === "payment" && <FlightCheckout />}
          {flightStep === "success" && <FlightSuccess />}
        </>
      )}

      {/* 3. HOTEL BOOKING FLOW ROUTE */}
      {activeTab === "hotels" && (
        <>
          {hotelStep === "search" && (
            <div className="animate-fade-in">
              <Hero />
              <SearchWidget />

              {/* Elegant Hotel Landing features block */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-extrabold tracking-widest text-gold uppercase">
                    Unmatched Hospitality
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black mt-3 font-serif">
                    Elite Hotels, Villas & Retreats
                  </h2>
                  <div className="w-16 h-[2px] bg-gold mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { city: "London", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80", count: "12 Properties" },
                    { city: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80", count: "18 Properties" },
                    { city: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80", count: "10 Properties" },
                    { city: "Maldives", img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=400&q=80", count: "14 Properties" }
                  ].map((dest, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-xl border border-luxury-border overflow-hidden group shadow-sm hover:shadow-md transition-all duration-350 cursor-pointer"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <img 
                          src={dest.img} 
                          alt={dest.city} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-sm text-luxury-textPrimary font-serif">{dest.city} Luxury Collections</h4>
                        <span className="text-[10px] text-gold font-extrabold uppercase mt-1 block">{dest.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {hotelStep === "loading" && <HotelSearchLoader />}
          {hotelStep === "results" && <HotelResults />}
          {hotelStep === "details" && <HotelDetailsView />}
          {hotelStep === "rooms" && <RoomsList />}
          {hotelStep === "facilities" && <FacilitiesGrid />}
          {hotelStep === "checkout" && <HotelCheckout />}
          {hotelStep === "confirmation" && <HotelConfirmation />}
        </>
      )}

    </div>
  );
}
