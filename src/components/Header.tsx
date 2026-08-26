"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Globe, User, LogOut, Shield } from "lucide-react";

export const Header: React.FC = () => {
  const { 
    currency, 
    toggleCurrency, 
    user, 
    login, 
    logout, 
    activeTab, 
    setActiveTab,
    setFlightStep,
    setHotelStep
  } = useApp();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"customer" | "agent" | "admin">("customer");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, role);
      setShowAuthModal(false);
      setEmail("");
    }
  };

  const handleNavClick = (tab: "flights" | "hotels" | "admin") => {
    setActiveTab(tab);
    if (tab === "flights") setFlightStep("search");
    if (tab === "hotels") setHotelStep("search");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-burgundy text-gold-light py-2 px-4 text-center text-xs md:text-sm font-semibold tracking-wide border-b border-gold/30">
        <p>✨ Book flights, hotels, holidays and visa assistance worldwide through Comerel Travels.</p>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-luxury-white/95 backdrop-blur-md border-b border-luxury-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Comerel Logo */}
          <div 
            onClick={() => handleNavClick("flights")} 
            className="flex items-center space-x-2 cursor-pointer transition transform hover:scale-[1.02]"
          >
            <img src="/comerel_logo.png" alt="Comerel Travels Logo" className="h-10 w-auto md:h-12" />
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-xs lg:text-sm font-bold tracking-wide uppercase">
            <button 
              onClick={() => handleNavClick("flights")}
              className={`pb-1 transition-all duration-200 border-b-2 hover:text-burgundy hover:border-burgundy ${
                activeTab === "flights" ? "text-burgundy border-burgundy" : "text-luxury-textSecondary border-transparent"
              }`}
            >
              Flights
            </button>
            <button 
              onClick={() => handleNavClick("hotels")}
              className={`pb-1 transition-all duration-200 border-b-2 hover:text-burgundy hover:border-burgundy ${
                activeTab === "hotels" ? "text-burgundy border-burgundy" : "text-luxury-textSecondary border-transparent"
              }`}
            >
              Hotels
            </button>
            <a href="#visa" onClick={() => alert("Visa Assistance services: Please contact our consultants for documentation and application processing.")} className="text-luxury-textSecondary hover:text-burgundy transition-all border-b-2 border-transparent hover:border-burgundy pb-1">
              Visa Services
            </a>
            <a href="#holidays" onClick={() => alert("Holiday Packages: Custom luxury resort stays available. Contact us for direct packages.")} className="text-luxury-textSecondary hover:text-burgundy transition-all border-b-2 border-transparent hover:border-burgundy pb-1">
              Holidays
            </a>
            <a href="#about" onClick={() => alert("Comerel Travels: Premium travel aggregator delivering unparalleled worldwide flight connectivity and hotel packages since 2012.")} className="text-luxury-textSecondary hover:text-burgundy transition-all border-b-2 border-transparent hover:border-burgundy pb-1">
              About Us
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Currency Selector */}
            <button 
              onClick={toggleCurrency}
              className="px-2.5 py-1.5 border border-luxury-border rounded-lg text-xs font-bold bg-luxury-soft text-luxury-textPrimary flex items-center space-x-1 hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>{currency}</span>
            </button>

            {/* Admin shortcut */}
            {user?.role === "admin" && (
              <button
                onClick={() => handleNavClick("admin")}
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === "admin" ? "bg-burgundy text-white" : "bg-luxury-soft text-burgundy hover:bg-burgundy/10"
                }`}
                title="Admin Dashboard"
              >
                <Shield className="w-4 h-4" />
              </button>
            )}

            {/* User Login/Signup */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden lg:inline text-xs font-bold text-luxury-textPrimary">
                  Hi, {user.name} ({user.role})
                </span>
                <button 
                  onClick={logout}
                  className="p-2 border border-luxury-border text-gray-500 rounded-lg hover:text-red-600 hover:border-red-200 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-bold tracking-wider uppercase rounded-lg shadow-md transition-all duration-300"
              >
                Login / Signup
              </button>
            )}

          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-luxury-black w-full max-w-sm rounded-2xl p-6 border border-luxury-border shadow-2xl relative">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-luxury-black hover:scale-110 text-xl font-bold transition-all"
            >
              &times;
            </button>
            
            <div className="text-center mb-6">
              <img src="/comerel_logo.png" alt="Comerel Logo" className="h-10 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-luxury-textPrimary">Sign In to Your Account</h3>
              <p className="text-xs text-luxury-textSecondary mt-1">Access flight booking holds & luxury packages.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-bold text-luxury-textPrimary">
              <div>
                <label className="block mb-1 text-gray-500">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-500">Sign in as</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full border border-luxury-border rounded-lg p-2.5 bg-luxury-soft outline-none focus:border-burgundy text-xs"
                >
                  <option value="customer">Customer</option>
                  <option value="agent">Travel Agent</option>
                  <option value="admin">Administrator (Admin Dashboard Enabled)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 bg-burgundy hover:bg-burgundy-light text-white rounded-lg uppercase tracking-wider font-bold transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
