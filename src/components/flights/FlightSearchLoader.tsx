"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";

const loaderMessages = [
  "Searching global airlines...",
  "Comparing fares...",
  "Finding best routes...",
  "Checking available seats...",
  "Applying special fares...",
  "Finalizing results..."
];

const loaderImages = [
  "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80"
];

export const FlightSearchLoader: React.FC = () => {
  const { flightSearch, setFlightStep } = useApp();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    // Increment progress over ~4 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setFlightStep("results");
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 200);

    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loaderMessages.length);
    }, 700);

    // Rotate images
    const imageInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % loaderImages.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(imageInterval);
    };
  }, [setFlightStep]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/75 backdrop-blur-md px-4">
      <div className="bg-white rounded-2xl p-8 border border-luxury-border shadow-2xl w-full max-w-md text-center overflow-hidden">
        
        {/* Animated image backdrop with flight icon */}
        <div className="h-40 w-full rounded-xl overflow-hidden mb-6 relative bg-luxury-soft">
          <img 
            src={loaderImages[imageIndex]} 
            alt="Aggregating Flights" 
            className="w-full h-full object-cover opacity-80 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          
          {/* Plane flying animation */}
          <div className="absolute bottom-4 left-0 w-full flex justify-center animate-flight-path">
            <span className="text-4xl drop-shadow-md">✈️</span>
          </div>
        </div>

        {/* Brand logo */}
        <img src="/comerel_logo.png" alt="Comerel Logo" className="h-10 mx-auto mb-4" />

        {/* Query Info Card */}
        <div className="bg-luxury-soft p-4 rounded-xl text-left text-xs font-semibold text-luxury-textSecondary grid grid-cols-2 gap-y-3 gap-x-2 border border-luxury-border">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-gray-400">Route</span>
            <span className="text-luxury-textPrimary font-bold">{flightSearch.from} → {flightSearch.to}</span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-gray-400">Depart Date</span>
            <span className="text-luxury-textPrimary font-bold">{flightSearch.departDate}</span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-gray-400">Cabin Class</span>
            <span className="text-luxury-textPrimary font-bold">{flightSearch.cabin}</span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-gray-400">Travellers</span>
            <span className="text-luxury-textPrimary font-bold">{flightSearch.passengers} Adult(s)</span>
          </div>
        </div>

        {/* Status Message */}
        <h3 className="text-sm md:text-base font-black text-burgundy mt-6 h-6 transition-all duration-300 font-serif">
          {loaderMessages[messageIndex]}
        </h3>
        
        {/* Progress Bar with Luxury Gold representation */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mt-4 border border-gray-250/20">
          <div 
            className="brand-gold-gradient h-full transition-all duration-200" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Progress labels */}
        <div className="flex justify-between items-center text-[10px] text-luxury-textSecondary font-black uppercase tracking-wider mt-2">
          <span>Search Status</span>
          <span className="text-burgundy">{Math.min(progress, 100)}%</span>
        </div>

      </div>
    </div>
  );
};
