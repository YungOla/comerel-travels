"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { SearchWidget } from "./SearchWidget";

const heroSlides = [
  {
    city: "Luxury Aviation",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1920&q=80",
    quote: "Explore The World With Confidence"
  },
  {
    city: "Bespoke Resorts",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=80",
    quote: "Indulge in Luxury Worldwide"
  },
  {
    city: "Historic Cities",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80",
    quote: "Immersive Cultural Discoveries"
  },
  {
    city: "Exquisite Gateways",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80",
    quote: "Your Premium Travel Partner"
  }
];

export const Hero: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[650px] w-full overflow-hidden bg-black flex flex-col justify-between">
      
      {/* Background Slideshow */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeSlide === idx ? "opacity-75 z-0" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/90 via-luxury-black/45 to-luxury-black/90 z-10"></div>
          <img 
            src={slide.image} 
            alt={slide.city} 
            className="w-full h-full object-cover transform scale-105 transition-transform duration-[6000ms] ease-out" 
          />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-4 max-w-7xl mx-auto text-center mt-[-30px]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-xl max-w-4xl font-serif">
          Explore The World With <span className="text-gold italic font-normal">Confidence</span>
        </h1>
        <p className="text-sm md:text-base text-gray-200 mt-6 max-w-2xl font-light tracking-wide leading-relaxed">
          Book flights, hotels, holidays, visas and travel experiences worldwide through Comerel Travels—your premium luxury concierge.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button 
            onClick={() => {
              setActiveTab("flights");
              document.getElementById("booking-widget-anchor")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 bg-burgundy hover:bg-burgundy-light text-white font-bold rounded-lg tracking-wider uppercase glow-btn shadow-lg transition-all duration-300"
          >
            Search Flights
          </button>
          <button 
            onClick={() => {
              setActiveTab("hotels");
              document.getElementById("booking-widget-anchor")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold rounded-lg tracking-wider uppercase shadow-lg transition-all duration-300"
          >
            Search Hotels
          </button>
        </div>
      </div>

      {/* Target anchor for smooth scroll */}
      <div id="booking-widget-anchor" className="absolute bottom-0 w-full h-1 bg-transparent"></div>
    </div>
  );
};
