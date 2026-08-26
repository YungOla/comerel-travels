"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { Room } from "../../utils/mockData";
import { Users, Info, Bed } from "lucide-react";

export const RoomsList: React.FC = () => {
  const {
    selectedHotel,
    hotelSearch,
    setHotelStep,
    setSelectedRoom,
    formatMoney
  } = useApp();

  if (!selectedHotel) return null;

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setHotelStep("facilities");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans text-xs">
      
      {/* Back button */}
      <button 
        onClick={() => setHotelStep("details")}
        className="mb-6 inline-flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-burgundy hover:underline"
      >
        <span>← Back to Hotel Description</span>
      </button>

      {/* Rooms header */}
      <div className="bg-white p-5 rounded-xl border border-luxury-border shadow-sm mb-6">
        <h3 className="text-base font-black text-luxury-textPrimary uppercase tracking-wider">
          Rooms
        </h3>
      </div>

      {/* Room listings matching Frame 12 */}
      <div className="space-y-4">
        {selectedHotel.rooms.map((room) => {
          const totalStayCost = room.pricePerNight * hotelSearch.nights * hotelSearch.rooms;
          const usdTotal = Math.round(totalStayCost / 1600);

          return (
            <div 
              key={room.id}
              className="bg-white border border-luxury-border rounded-xl p-5 hover:shadow-sm transition flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
            >
              
              {/* Left Column: Room layouts & capacity details */}
              <div className="w-full md:w-56 space-y-2 font-semibold">
                <h4 className="text-sm font-black text-burgundy uppercase tracking-wide">
                  {hotelSearch.rooms} x {room.name.toLowerCase()}
                </h4>
                
                <div className="space-y-1 text-luxury-textSecondary text-[11px]">
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-gold" />
                    <span>{room.maxGuests} adults</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Bed className="w-3.5 h-3.5 text-gold" />
                    <span>No Of Rooms: {hotelSearch.rooms}</span>
                  </div>
                </div>
              </div>

              {/* Middle-Left Column: Cancellation policies & green meal plan badges */}
              <div className="w-full md:w-56 space-y-2 text-left text-[11px] font-semibold">
                <div>
                  <span className={`block font-bold uppercase ${
                    room.cancellationPolicy.toLowerCase().includes("free") ? "text-emerald-650" : "text-amber-600"
                  }`}>
                    {room.cancellationPolicy}
                  </span>
                  <button 
                    type="button"
                    onClick={() => alert(`Cancellation policy: ${room.cancellationPolicy}. Non-refundable holds are charged immediately.`)}
                    className="text-burgundy hover:underline text-[10px] block mt-0.5"
                  >
                    View Cancellation Policy
                  </button>
                </div>

                <div>
                  <span className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wide">
                    {room.mealPlan}
                  </span>
                  <button 
                    type="button"
                    onClick={() => alert(`Voucher remarks: ${room.mealPlan} options are standard allocations. Custom menus require desk confirmation.`)}
                    className="text-burgundy hover:underline text-[10px] block mt-0.5"
                  >
                    View Remarks
                  </button>
                </div>
              </div>

              {/* Middle-Right Column: Pricing calculations */}
              <div className="w-full md:w-40 font-semibold text-left md:text-right">
                <span className="block text-sm md:text-base font-black text-luxury-textPrimary">
                  {formatMoney(totalStayCost)}
                </span>
                <span className="block text-[10px] text-luxury-textSecondary mt-0.5">
                  ${usdTotal}
                </span>
                <span className="block text-[9px] text-gray-400 uppercase font-black mt-0.5">
                  ( {hotelSearch.nights} NIGHTS )
                </span>
              </div>

              {/* Right Column: Book button */}
              <div className="w-full md:w-32 flex justify-end">
                <button
                  onClick={() => handleSelectRoom(room)}
                  className="w-full py-2.5 bg-burgundy hover:bg-burgundy-light text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-md transition-colors"
                >
                  Book
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
