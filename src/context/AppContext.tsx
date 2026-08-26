"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Flight, Hotel, Room, generateFlights, generateHotels } from "../utils/mockData";

export interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  passportIssueDate: string;
}

export interface FlightBooking {
  ref: string;
  flight: Flight;
  returnFlight?: Flight;
  passengers: Passenger[];
  contact: { email: string; phone: string };
  amount: number;
  option: "pay_now" | "hold";
  status: "Confirmed" | "On Hold" | "Paid";
  date: string;
}

export interface HotelReservation {
  ref: string;
  hotel: Hotel;
  room: Room;
  leadGuest: { firstName: string; lastName: string; email: string; phone: string };
  specialRequests: string;
  nights: number;
  roomsCount: number;
  amount: number;
  paymentMethod: "pay_now" | "pay_at_hotel";
  status: "Confirmed" | "On Hold" | "Paid";
  date: string;
}

interface UserSession {
  email: string;
  role: "customer" | "agent" | "admin";
  name: string;
}

interface AppContextProps {
  // Global Session & Settings
  currency: "NGN" | "USD";
  currencySymbol: string;
  exchangeRate: number;
  toggleCurrency: () => void;
  formatMoney: (amount: number) => string;
  
  user: UserSession | null;
  login: (email: string, role?: "customer" | "agent" | "admin") => void;
  logout: () => void;
  
  // Navigation Routing States
  activeTab: "flights" | "hotels" | "admin";
  setActiveTab: (tab: "flights" | "hotels" | "admin") => void;
  
  // Flights Booking Flow States
  flightStep: "search" | "loading" | "results" | "details" | "passenger" | "payment" | "success";
  setFlightStep: (step: "search" | "loading" | "results" | "details" | "passenger" | "payment" | "success") => void;
  
  flightSearch: {
    type: "oneway" | "roundtrip" | "multicity";
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    passengers: number;
    cabin: string;
    promo: string;
  };
  setFlightSearch: React.Dispatch<React.SetStateAction<any>>;
  
  flightResults: Flight[];
  selectedFlight: Flight | null;
  setSelectedFlight: (f: Flight | null) => void;
  
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  contactInfo: { email: string; phone: string };
  setContactInfo: React.Dispatch<React.SetStateAction<{ email: string; phone: string }>>;
  
  bookingOption: "pay_now" | "hold";
  setBookingOption: (opt: "pay_now" | "hold") => void;
  
  myFlightBookings: FlightBooking[];
  addFlightBooking: (booking: FlightBooking) => void;
  
  // Hotels Booking Flow States
  hotelStep: "search" | "loading" | "results" | "details" | "rooms" | "facilities" | "checkout" | "confirmation";
  setHotelStep: (step: "search" | "loading" | "results" | "details" | "rooms" | "facilities" | "checkout" | "confirmation") => void;
  
  hotelSearch: {
    location: string;
    checkin: string;
    checkout: string;
    nights: number;
    rooms: number;
    adults: number;
    children: number;
    nationality: string;
  };
  setHotelSearch: React.Dispatch<React.SetStateAction<any>>;
  
  hotelResults: Hotel[];
  selectedHotel: Hotel | null;
  setSelectedHotel: (h: Hotel | null) => void;
  selectedRoom: Room | null;
  setSelectedRoom: (r: Room | null) => void;
  
  leadGuest: { firstName: string; lastName: string; email: string; phone: string };
  setLeadGuest: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string; email: string; phone: string }>>;
  specialRequests: string;
  setSpecialRequests: (s: string) => void;
  hotelPromoCode: string;
  setHotelPromoCode: (s: string) => void;
  hotelPaymentMethod: "pay_now" | "pay_at_hotel";
  setHotelPaymentMethod: (opt: "pay_now" | "pay_at_hotel") => void;
  
  myHotelReservations: HotelReservation[];
  addHotelReservation: (res: HotelReservation) => void;

  // Search Request logs (for Admin Dashboard)
  flightSearchRequests: any[];
  hotelSearchRequests: any[];
  logFlightSearch: (from: string, to: string) => void;
  logHotelSearch: (location: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global config
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const exchangeRate = 1600; // 1 USD = 1600 NGN
  const currencySymbol = currency === "NGN" ? "₦" : "$";
  
  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "NGN" ? "USD" : "NGN"));
  };
  
  const formatMoney = (amount: number) => {
    const value = currency === "USD" ? amount / exchangeRate : amount;
    return `${currencySymbol}${Math.round(value).toLocaleString()}`;
  };

  // Auth session
  const [user, setUser] = useState<UserSession | null>(null);
  
  const login = (email: string, role: "customer" | "agent" | "admin" = "customer") => {
    const name = email.split("@")[0].toUpperCase();
    setUser({ email, role, name });
  };
  
  const logout = () => {
    setUser(null);
  };

  // Active Flow Routing
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "admin">("flights");

  // Flight Workflow states
  const [flightStep, setFlightStep] = useState<"search" | "loading" | "results" | "details" | "passenger" | "payment" | "success">("search");
  const [flightSearch, setFlightSearch] = useState({
    type: "roundtrip" as "oneway" | "roundtrip" | "multicity",
    from: "Lagos (LOS)",
    to: "Dubai (DXB)",
    departDate: "",
    returnDate: "",
    passengers: 1,
    cabin: "Economy",
    promo: ""
  });
  
  const [flightResults, setFlightResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  
  const [passengers, setPassengers] = useState<Passenger[]>([
    { title: "Mr", firstName: "", lastName: "", gender: "Male", dob: "", nationality: "Nigeria", passportNumber: "", passportExpiry: "", passportIssueDate: "" }
  ]);
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [bookingOption, setBookingOption] = useState<"pay_now" | "hold">("pay_now");
  const [myFlightBookings, setMyFlightBookings] = useState<FlightBooking[]>([]);

  // Hotel Workflow states
  const [hotelStep, setHotelStep] = useState<"search" | "loading" | "results" | "details" | "rooms" | "facilities" | "checkout" | "confirmation">("search");
  const [hotelSearch, setHotelSearch] = useState({
    location: "Dubai (UAE)",
    checkin: "",
    checkout: "",
    nights: 3,
    rooms: 1,
    adults: 2,
    children: 0,
    nationality: "Nigeria"
  });
  
  const [hotelResults, setHotelResults] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const [leadGuest, setLeadGuest] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [specialRequests, setSpecialRequests] = useState("");
  const [hotelPromoCode, setHotelPromoCode] = useState("");
  const [hotelPaymentMethod, setHotelPaymentMethod] = useState<"pay_now" | "pay_at_hotel">("pay_at_hotel");
  const [myHotelReservations, setMyHotelReservations] = useState<HotelReservation[]>([]);

  // Admin Logs
  const [flightSearchRequests, setFlightSearchRequests] = useState<any[]>([]);
  const [hotelSearchRequests, setHotelSearchRequests] = useState<any[]>([]);

  // Seed default dates on init
  useEffect(() => {
    const today = new Date();
    const depart = new Date(today);
    depart.setDate(today.getDate() + 7);
    const returnDt = new Date(today);
    returnDt.setDate(today.getDate() + 14);
    
    const departStr = depart.toISOString().split("T")[0];
    const returnStr = returnDt.toISOString().split("T")[0];

    setFlightSearch(prev => ({ ...prev, departDate: departStr, returnDate: returnStr }));
    setHotelSearch(prev => ({ ...prev, checkin: departStr, checkout: returnStr }));
  }, []);

  // Recalculate nights when checkin/checkout updates
  useEffect(() => {
    if (hotelSearch.checkin && hotelSearch.checkout) {
      const inDate = new Date(hotelSearch.checkin);
      const outDate = new Date(hotelSearch.checkout);
      const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setHotelSearch((prev: any) => ({ ...prev, nights: diffDays > 0 ? diffDays : 1 }));
    }
  }, [hotelSearch.checkin, hotelSearch.checkout]);

  // Sync passengers count
  useEffect(() => {
    const currentCount = passengers.length;
    const targetCount = flightSearch.passengers;
    if (targetCount > currentCount) {
      const needed = targetCount - currentCount;
      const added = Array.from({ length: needed }).map(() => ({
        title: "Mr", firstName: "", lastName: "", gender: "Male", dob: "", nationality: "Nigeria", passportNumber: "", passportExpiry: "", passportIssueDate: ""
      }));
      setPassengers((prev) => [...prev, ...added]);
    } else if (targetCount < currentCount) {
      setPassengers((prev) => prev.slice(0, targetCount));
    }
  }, [flightSearch.passengers]);

  // Search Triggers
  useEffect(() => {
    if (flightStep === "results") {
      const list = generateFlights(flightSearch.from, flightSearch.to, flightSearch.departDate);
      setFlightResults(list);
    }
  }, [flightStep, flightSearch.from, flightSearch.to, flightSearch.departDate]);

  useEffect(() => {
    if (hotelStep === "results") {
      const list = generateHotels(hotelSearch.location);
      setHotelResults(list);
    }
  }, [hotelStep, hotelSearch.location]);

  // Log functions for search requests
  const logFlightSearch = (from: string, to: string) => {
    setFlightSearchRequests((prev) => [
      { from, to, date: new Date().toLocaleTimeString(), cabin: flightSearch.cabin, passengers: flightSearch.passengers },
      ...prev
    ]);
  };

  const logHotelSearch = (location: string) => {
    setHotelSearchRequests((prev) => [
      { location, date: new Date().toLocaleTimeString(), nights: hotelSearch.nights, rooms: hotelSearch.rooms, guests: hotelSearch.adults + hotelSearch.children },
      ...prev
    ]);
  };

  // Add booking triggers
  const addFlightBooking = (booking: FlightBooking) => {
    setMyFlightBookings((prev) => [booking, ...prev]);
  };

  const addHotelReservation = (res: HotelReservation) => {
    setMyHotelReservations((prev) => [res, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        currencySymbol,
        exchangeRate,
        toggleCurrency,
        formatMoney,
        user,
        login,
        logout,
        activeTab,
        setActiveTab,
        flightStep,
        setFlightStep,
        flightSearch,
        setFlightSearch,
        flightResults,
        selectedFlight,
        setSelectedFlight,
        passengers,
        setPassengers,
        contactInfo,
        setContactInfo,
        bookingOption,
        setBookingOption,
        myFlightBookings,
        addFlightBooking,
        hotelStep,
        setHotelStep,
        hotelSearch,
        setHotelSearch,
        hotelResults,
        selectedHotel,
        setSelectedHotel,
        selectedRoom,
        setSelectedRoom,
        leadGuest,
        setLeadGuest,
        specialRequests,
        setSpecialRequests,
        hotelPromoCode,
        setHotelPromoCode,
        hotelPaymentMethod,
        setHotelPaymentMethod,
        myHotelReservations,
        addHotelReservation,
        flightSearchRequests,
        hotelSearchRequests,
        logFlightSearch,
        logHotelSearch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
