"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing to our Voyager Newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-luxury-black text-gray-400 py-12 border-t border-gold/20 font-sans text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand section */}
        <div className="space-y-4">
          <img
            src="/comerel_logo.png"
            alt="Comerel Travels" 
            className="h-10 w-auto filter invert brightness-200" 
          />
          <p className="text-xs text-gray-500 leading-relaxed">
            Comerel Travels is Nigeria's premium luxury travel tech aggregator. Delivering unparalleled worldwide flight connectivity and hotel packages since 2012.
          </p>
          <div className="space-y-2 text-xs text-gray-500 pt-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Suite 108 Aminu Kano Cres, Wuse 2, Abuja, Nigeria</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+234 904 595 2027</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>info@comereltravels.com</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-gold uppercase font-bold tracking-widest text-xs mb-4">Our Services</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-semibold">
            <li><a href="#flights" className="hover:text-gold transition-colors">International Flight Booking</a></li>
            <li><a href="#flights" className="hover:text-gold transition-colors">Domestic Flight Booking</a></li>
            <li><a href="#hotels" className="hover:text-gold transition-colors">Luxury Hotel Reservations</a></li>
            <li><a href="#visa" className="hover:text-gold transition-colors">Visa Consultation Assistance</a></li>
            <li><a href="#holidays" className="hover:text-gold transition-colors">Corporate Travel Solutions</a></li>
            <li><a href="#transfers" className="hover:text-gold transition-colors">Airport VIP Transfers</a></li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-gold uppercase font-bold tracking-widest text-xs mb-4">Support & Legal</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-semibold">
            <li><a href="#tc" className="hover:text-gold transition-colors">Terms & Conditions</a></li>
            <li><a href="#privacy" className="hover:text-gold transition-colors">Privacy Protection Policy</a></li>
            <li><a href="#refund" className="hover:text-gold transition-colors">Ticket Refund Policy</a></li>
            <li><a href="#hold" className="hover:text-gold transition-colors">Hold Fare Policy</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact Support Centre</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-gold uppercase font-bold tracking-widest text-xs mb-2">Voyager Newsletter</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Subscribe to receive premium flight deals, bespoke holiday packages, and global destination guides.
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="bg-gray-900 border border-gray-800 rounded-l-lg p-2.5 w-full text-xs text-white placeholder-gray-600 outline-none focus:border-gold"
            />
            <button 
              type="submit" 
              className="bg-burgundy hover:bg-burgundy-light text-white px-4 rounded-r-lg font-bold text-xs uppercase transition-colors flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-650">
        <p>© 2026 Comerel Travels. All Rights Reserved. Derived from Comerel design specifications.</p>
      </div>
    </footer>
  );
};
