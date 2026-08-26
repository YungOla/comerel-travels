"use client";

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  ShieldCheck, BarChart3, Plane, Hotel, Users, DollarSign, 
  Search, CheckCircle, Clock, XCircle, ArrowRight, UserPlus 
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const {
    myFlightBookings,
    myHotelReservations,
    flightSearchRequests,
    hotelSearchRequests,
    formatMoney
  } = useApp();

  const [activeTab, setActiveTab] = useState<"summary" | "flights" | "hotels" | "users" | "payments">("summary");

  // Mock users database
  const mockCustomers = [
    { id: "CUST-001", name: "Abdulsalam Niyi", email: "niyi@domain.com", bookings: 4, type: "VIP" },
    { id: "CUST-002", name: "Sarah Jenkins", email: "sarah.j@travel.com", bookings: 2, type: "Regular" },
    { id: "CUST-003", name: "Tunde Bakare", email: "bakare@corporate.ng", bookings: 8, type: "Corporate" },
    { id: "CUST-004", name: "Amadi Okafor", email: "okafor@gmail.com", bookings: 1, type: "Regular" }
  ];

  const mockAgents = [
    { id: "AGNT-101", name: "Chinedu Okeke", email: "chinedu@comereltravels.com", branch: "Abuja Wuse 2", status: "Active" },
    { id: "AGNT-102", name: "Fatima Yusuf", email: "fatima.y@comereltravels.com", branch: "Lagos Ikeja", status: "Active" },
    { id: "AGNT-103", name: "Blessing Effiong", email: "blessing@comereltravels.com", branch: "Port Harcourt", status: "On Leave" }
  ];

  // Mock transactions
  const mockTransactions = [
    { id: "TXN-9081", ref: "CMF894321", gateway: "Paystack", amount: 245000, date: "2026-08-21", status: "Successful" },
    { id: "TXN-9082", ref: "CMH239423", gateway: "Flutterwave", amount: 185000, date: "2026-08-20", status: "Successful" },
    { id: "TXN-9083", ref: "CMF409823", gateway: "Bank Transfer", amount: 692000, date: "2026-08-20", status: "Pending Verification" },
    { id: "TXN-9084", ref: "CMH890123", gateway: "Paystack", amount: 95000, date: "2026-08-19", status: "Refunded" }
  ];

  // Summary Metrics calculations
  const totalHeldFlights = myFlightBookings.filter(b => b.option === "hold").length;
  const totalRevenue = myFlightBookings.reduce((sum, b) => sum + (b.option === "pay_now" ? b.amount : 0), 0) +
                       myHotelReservations.reduce((sum, h) => sum + (h.paymentMethod === "pay_now" ? h.amount : 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-luxury-border pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] text-gold font-extrabold uppercase tracking-widest block">
            Internal Operations portal
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-luxury-textPrimary flex items-center gap-2 font-serif mt-1">
            <ShieldCheck className="w-8 h-8 text-burgundy" />
            <span>Comerel Travels Admin Console</span>
          </h1>
        </div>
        
        <div className="flex gap-2">
          <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg border border-emerald-200 font-bold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Aggregator Feed Connective</span>
          </span>
        </div>
      </div>

      {/* Grid Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-5 rounded-xl border border-luxury-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-luxury-textSecondary uppercase tracking-wider font-extrabold">Flight Bookings</span>
            <span className="block text-3xl font-black text-luxury-textPrimary mt-1">{myFlightBookings.length}</span>
            <span className="text-[10px] text-amber-600 font-bold block mt-1">{totalHeldFlights} Active Holds</span>
          </div>
          <div className="bg-burgundy/10 p-3.5 rounded-xl text-burgundy">
            <Plane className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-luxury-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-luxury-textSecondary uppercase tracking-wider font-extrabold">Hotel Reservations</span>
            <span className="block text-3xl font-black text-luxury-textPrimary mt-1">{myHotelReservations.length}</span>
            <span className="text-[10px] text-gray-450 font-semibold block mt-1">Rooms reserved globally</span>
          </div>
          <div className="bg-gold/10 p-3.5 rounded-xl text-gold">
            <Hotel className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-luxury-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-luxury-textSecondary uppercase tracking-wider font-extrabold">Logged In Users</span>
            <span className="block text-3xl font-black text-luxury-textPrimary mt-1">
              {mockCustomers.length + mockAgents.length}
            </span>
            <span className="text-[10px] text-emerald-650 font-bold block mt-1">{mockAgents.length} Agents active</span>
          </div>
          <div className="bg-luxury-soft p-3.5 rounded-xl text-gray-500">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-luxury-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-luxury-textSecondary uppercase tracking-wider font-extrabold">Aggregated Revenue</span>
            <span className="block text-2xl font-black text-burgundy mt-1 font-serif">{formatMoney(totalRevenue)}</span>
            <span className="text-[10px] text-gray-400 font-semibold block mt-1">From pre-paid requests</span>
          </div>
          <div className="bg-emerald-50 p-3.5 rounded-xl text-emerald-700">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Tabs Menu selectors */}
      <div className="flex border-b border-luxury-border mb-6 text-xs md:text-sm font-black uppercase tracking-wider">
        <button 
          onClick={() => setActiveTab("summary")}
          className={`px-5 py-3 border-b-2 transition-colors ${
            activeTab === "summary" ? "border-burgundy text-burgundy" : "border-transparent text-luxury-textSecondary hover:text-burgundy"
          }`}
        >
          Queries Feed
        </button>
        <button 
          onClick={() => setActiveTab("flights")}
          className={`px-5 py-3 border-b-2 transition-colors ${
            activeTab === "flights" ? "border-burgundy text-burgundy" : "border-transparent text-luxury-textSecondary hover:text-burgundy"
          }`}
        >
          Flights Requests ({myFlightBookings.length})
        </button>
        <button 
          onClick={() => setActiveTab("hotels")}
          className={`px-5 py-3 border-b-2 transition-colors ${
            activeTab === "hotels" ? "border-burgundy text-burgundy" : "border-transparent text-luxury-textSecondary hover:text-burgundy"
          }`}
        >
          Hotels Reservations ({myHotelReservations.length})
        </button>
        <button 
          onClick={() => setActiveTab("users")}
          className={`px-5 py-3 border-b-2 transition-colors ${
            activeTab === "users" ? "border-burgundy text-burgundy" : "border-transparent text-luxury-textSecondary hover:text-burgundy"
          }`}
        >
          Staff & Customers ({mockCustomers.length + mockAgents.length})
        </button>
        <button 
          onClick={() => setActiveTab("payments")}
          className={`px-5 py-3 border-b-2 transition-colors ${
            activeTab === "payments" ? "border-burgundy text-burgundy" : "border-transparent text-luxury-textSecondary hover:text-burgundy"
          }`}
        >
          Payments Logs
        </button>
      </div>

      {/* TAB CONTENT: SEARCH QUERIES SUMMARY FEED */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Flights Search Requests logs */}
          <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-4">
            <h3 className="text-sm font-black text-luxury-textPrimary uppercase tracking-widest flex items-center space-x-1.5 border-b pb-3">
              <Search className="w-4 h-4 text-gold" />
              <span>Flights Search Requests</span>
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {flightSearchRequests.length === 0 ? (
                <p className="text-xs text-luxury-textSecondary p-4 text-center">No flight search queries recorded yet.</p>
              ) : (
                flightSearchRequests.map((req, idx) => (
                  <div key={idx} className="p-3 bg-luxury-soft rounded-lg border border-luxury-border flex justify-between items-center text-xs">
                    <div className="space-y-1">
                      <span className="font-black text-luxury-textPrimary block">
                        {req.from} → {req.to}
                      </span>
                      <span className="text-[10px] text-luxury-textSecondary block">
                        Cabin: {req.cabin} | Travellers: {req.passengers}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{req.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Hotels Search Requests logs */}
          <div className="bg-white p-6 rounded-xl border border-luxury-border shadow-sm space-y-4">
            <h3 className="text-sm font-black text-luxury-textPrimary uppercase tracking-widest flex items-center space-x-1.5 border-b pb-3">
              <Search className="w-4 h-4 text-gold" />
              <span>Hotels Search Requests</span>
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {hotelSearchRequests.length === 0 ? (
                <p className="text-xs text-luxury-textSecondary p-4 text-center">No hotel search queries recorded yet.</p>
              ) : (
                hotelSearchRequests.map((req, idx) => (
                  <div key={idx} className="p-3 bg-luxury-soft rounded-lg border border-luxury-border flex justify-between items-center text-xs">
                    <div className="space-y-1">
                      <span className="font-black text-luxury-textPrimary block">
                        {req.location}
                      </span>
                      <span className="text-[10px] text-luxury-textSecondary block">
                        Nights: {req.nights} | Rooms: {req.rooms} | Guests: {req.guests}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{req.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FLIGHTS REQUESTS & HOLDS */}
      {activeTab === "flights" && (
        <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden text-xs">
          <div className="p-6 border-b border-luxury-border flex justify-between items-center">
            <h3 className="text-sm font-black text-luxury-textPrimary uppercase tracking-wider">Flight Ticket Transactions</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-luxury-soft border-b border-luxury-border text-gray-400 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Airline</th>
                  <th className="p-4">Travellers</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border text-luxury-textPrimary font-semibold">
                {myFlightBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-luxury-textSecondary">
                      No flights booked in this session.
                    </td>
                  </tr>
                ) : (
                  myFlightBookings.map((b) => (
                    <tr key={b.ref} className="hover:bg-luxury-soft/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-burgundy">{b.ref}</td>
                      <td className="p-4">{b.flight.from.split(" ")[0]} → {b.flight.to.split(" ")[0]}</td>
                      <td className="p-4">{b.flight.airlineName} ({b.flight.flightNumber})</td>
                      <td className="p-4">{b.passengers.length} Adult(s)</td>
                      <td className="p-4">{b.date}</td>
                      <td className="p-4 font-black">{formatMoney(b.amount)}</td>
                      <td className="p-4 uppercase text-[10px] tracking-wider font-bold">
                        {b.option === "pay_now" ? "Pay Now" : "Book on Hold"}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          b.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          {b.status === "Confirmed" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{b.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: HOTELS RESERVATIONS */}
      {activeTab === "hotels" && (
        <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden text-xs">
          <div className="p-6 border-b border-luxury-border flex justify-between items-center">
            <h3 className="text-sm font-black text-luxury-textPrimary uppercase tracking-wider">Hotel Voucher Reservations</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-luxury-soft border-b border-luxury-border text-gray-400 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Hotel</th>
                  <th className="p-4">Room Layout</th>
                  <th className="p-4">Guest Info</th>
                  <th className="p-4">Stay Config</th>
                  <th className="p-4">Voucher Cost</th>
                  <th className="p-4">Billing Plan</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border text-luxury-textPrimary font-semibold">
                {myHotelReservations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-luxury-textSecondary">
                      No hotel rooms reserved in this session.
                    </td>
                  </tr>
                ) : (
                  myHotelReservations.map((h) => (
                    <tr key={h.ref} className="hover:bg-luxury-soft/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-burgundy">{h.ref}</td>
                      <td className="p-4">{h.hotel.name}</td>
                      <td className="p-4">{h.room.name}</td>
                      <td className="p-4">{h.leadGuest.firstName} {h.leadGuest.lastName}</td>
                      <td className="p-4">{h.nights} Nights ({h.roomsCount} Rooms)</td>
                      <td className="p-4 font-black">{formatMoney(h.amount)}</td>
                      <td className="p-4 uppercase text-[10px] tracking-wider font-bold">
                        {h.paymentMethod === "pay_now" ? "Pay Now" : "Pay at Hotel"}
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CUSTOMERS & AGENTS STAFF */}
      {activeTab === "users" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          
          {/* Customers database */}
          <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden">
            <div className="p-5 border-b border-luxury-border flex justify-between items-center bg-luxury-soft/50">
              <h3 className="font-black text-luxury-textPrimary uppercase tracking-wider flex items-center space-x-1">
                <span>Customers Registry</span>
              </h3>
            </div>
            
            <div className="divide-y divide-luxury-border">
              {mockCustomers.map((c) => (
                <div key={c.id} className="p-4 flex justify-between items-center hover:bg-luxury-soft/20 transition-colors font-semibold">
                  <div>
                    <span className="font-bold text-luxury-textPrimary block">{c.name}</span>
                    <span className="text-[10px] text-luxury-textSecondary block">{c.email} | {c.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-black text-burgundy">{c.bookings} Bookings</span>
                    <span className="text-[9px] uppercase tracking-wider text-gold font-extrabold">{c.type} Customer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Agents Registry */}
          <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden">
            <div className="p-5 border-b border-luxury-border flex justify-between items-center bg-luxury-soft/50">
              <h3 className="font-black text-luxury-textPrimary uppercase tracking-wider">Travel Agents Staff</h3>
            </div>
            
            <div className="divide-y divide-luxury-border font-semibold">
              {mockAgents.map((a) => (
                <div key={a.id} className="p-4 flex justify-between items-center hover:bg-luxury-soft/20 transition-colors">
                  <div>
                    <span className="font-bold text-luxury-textPrimary block">{a.name}</span>
                    <span className="text-[10px] text-luxury-textSecondary block">{a.email} | {a.id}</span>
                  </div>
                  <div className="text-right font-semibold">
                    <span className="block text-xs font-bold text-luxury-textPrimary">{a.branch} branch</span>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-650 font-extrabold">{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: PAYMENTS TRANSACTION LOGS */}
      {activeTab === "payments" && (
        <div className="bg-white rounded-xl border border-luxury-border shadow-sm overflow-hidden text-xs">
          <div className="p-6 border-b border-luxury-border flex justify-between items-center">
            <h3 className="text-sm font-black text-luxury-textPrimary uppercase tracking-wider">Gateway Transaction Registry</h3>
          </div>
          
          <div className="overflow-x-auto font-semibold">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-luxury-soft border-b border-luxury-border text-gray-400 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Booking Ref</th>
                  <th className="p-4">Payment Gateway</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Settlement Status</th>
                  <th className="p-4">Refund Request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-border text-luxury-textPrimary">
                {mockTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-luxury-soft/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-burgundy">{txn.id}</td>
                    <td className="p-4 font-mono">{txn.ref}</td>
                    <td className="p-4">{txn.gateway}</td>
                    <td className="p-4 font-black">{formatMoney(txn.amount)}</td>
                    <td className="p-4">{txn.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        txn.status === "Successful" 
                          ? "bg-emerald-50 text-emerald-700" 
                          : txn.status === "Refunded" 
                          ? "bg-red-50 text-red-700" 
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {txn.status === "Successful" ? (
                        <button
                          onClick={() => alert(`Refund requested for ${txn.id}. Our auditing team will validate and respond within 7 days.`)}
                          className="text-burgundy hover:underline font-bold"
                        >
                          Request Refund
                        </button>
                      ) : (
                        <span className="text-gray-400">Not Applicable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
