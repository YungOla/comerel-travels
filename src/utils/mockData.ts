export interface Flight {
  id: string;
  airlineName: string;
  airlineLogoCode: string;
  flightNumber: string;
  from: string;
  to: string;
  departTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopover?: string;
  baggage: string;
  refundability: string;
  fareType: string;
  price: number; // in NGN (Base value)
  cabin: string;
}

export interface Room {
  id: string;
  name: string;
  maxGuests: number;
  mealPlan: string;
  cancellationPolicy: string;
  size: string;
  pricePerNight: number; // in NGN
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  location: string;
  area: string;
  distance: string;
  description: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  amenitiesList: string[];
  freeCancellation: boolean;
  pricePerNight: number; // in NGN
  rooms: Room[];
}

export const mockAirlines = [
  { name: "Emirates", code: "EK" },
  { name: "Qatar Airways", code: "QR" },
  { name: "British Airways", code: "BA" },
  { name: "Lufthansa", code: "LH" },
  { name: "Air France", code: "AF" },
  { name: "Turkish Airlines", code: "TK" },
  { name: "Ethiopian Airlines", code: "ET" },
  { name: "Air Peace", code: "P4" },
  { name: "United Nigeria", code: "UN" },
  { name: "Ibom Air", code: "QI" }
];

export const mockHotelsList = [
  "Marriott Hotel", "Hilton Hotel", "Radisson Blu", "Four Points by Sheraton", 
  "Sheraton Hotel", "Hyatt Regency", "Intercontinental", "Mövenpick Resort", 
  "Golden Tulip", "Eko Hotel & Suites", "Transcorp Hilton", "Comerel Royal Resort", 
  "The Ritz-Carlton", "Sofitel Luxury Palace", "Waldorf Astoria", "Kempinski Hotel"
];

// Helper to generate mock flights
export const generateFlights = (from: string, to: string, dateStr: string): Flight[] => {
  const list: Flight[] = [];
  let idCounter = 1;

  mockAirlines.forEach((airline, idx) => {
    // Generate 2-3 flights per airline
    const cabinClasses = ["Economy", "Business", "First"];
    
    cabinClasses.forEach((cabin) => {
      const stops = idx % 3 === 0 ? 0 : idx % 3 === 1 ? 1 : 2;
      const basePrice = 120000 + (idx * 45000) + (cabin === "Business" ? 280000 : cabin === "First" ? 650000 : 0);
      
      const departHour = (7 + (idx * 2) + (cabin === "Business" ? 1 : 0)) % 24;
      const departMin = idx % 2 === 0 ? "00" : "30";
      const departTime = `${departHour.toString().padStart(2, "0")}:${departMin}`;
      
      const durationHours = 1 + (idx % 4) + (stops * 3);
      const durationMins = idx % 2 === 0 ? 15 : 45;
      const duration = `${durationHours}h ${durationMins}m`;

      const arrivalHour = (departHour + durationHours) % 24;
      const arrivalMin = (parseInt(departMin) + durationMins) % 60;
      const arrivalTime = `${arrivalHour.toString().padStart(2, "0")}:${arrivalMin.toString().padStart(2, "0")}`;

      list.push({
        id: `FL-${from.substring(0, 3)}-${to.substring(0, 3)}-${idCounter++}`,
        airlineName: airline.name,
        airlineLogoCode: airline.code,
        flightNumber: `${airline.code}-${100 + idCounter}`,
        from,
        to,
        departTime,
        arrivalTime,
        duration,
        stops,
        stopover: stops > 0 ? (stops === 1 ? "ADD" : "IST") : undefined,
        baggage: cabin === "Economy" ? "23kg" : cabin === "Business" ? "32kg" : "40kg",
        refundability: idx % 2 === 0 ? "Refundable" : "Non-Refundable",
        fareType: cabin === "Economy" ? "Standard Economy" : cabin === "Business" ? "Business Promo" : "First Class Suite",
        price: basePrice,
        cabin
      });
    });
  });

  return list.sort((a, b) => a.price - b.price);
};

// Generates 50 realistic hotels
export const generateHotels = (location: string): Hotel[] => {
  const hotels: Hotel[] = [];
  const locationName = location.split(" ")[0].replace(/[()]/g, "");

  const areas = ["Near City Centre", "Waterfront District", "Exclusive Marina", "Business Hub", "Diplomatic Zone", "Historic Quarter"];
  const amenities = ["wifi", "pool", "gym", "spa", "restaurant", "shuttle", "parking", "roomservice"];
  
  const roomTypes = [
    { name: "Standard Room", size: "28 sqm", maxGuests: 2, priceMultiplier: 1 },
    { name: "Deluxe Ocean Room", size: "36 sqm", maxGuests: 2, priceMultiplier: 1.3 },
    { name: "Executive Suite", size: "52 sqm", maxGuests: 3, priceMultiplier: 1.8 },
    { name: "Family Connecting Room", size: "64 sqm", maxGuests: 4, priceMultiplier: 2.2 },
    { name: "Presidential Luxury Suite", size: "110 sqm", maxGuests: 4, priceMultiplier: 4.5 }
  ];

  const mealPlans = ["Room Only", "Breakfast Included", "Half Board", "Full Board", "All Inclusive"];
  const cancellationPolicies = ["Free Cancellation", "Non-Refundable", "Cancel up to 24h before"];

  // Image galleries of premium destinations
  const hotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
  ];

  for (let i = 0; i < 50; i++) {
    const brand = mockHotelsList[i % mockHotelsList.length];
    const name = i < mockHotelsList.length ? `${locationName} ${brand}` : `${brand} ${locationName} Premium`;
    const stars = 3 + (i % 3); // 3, 4, 5 stars
    const area = areas[i % areas.length];
    const distance = `${(0.5 + (i * 0.3)).toFixed(1)} km from centre`;
    const basePrice = 45000 + (stars * 35000) + ((i % 5) * 15000);
    const rating = parseFloat((4.0 + (i % 10) * 0.1).toFixed(1));
    const reviewsCount = 50 + (i * 24);
    
    // Distribute amenities
    const hotelAmenities: string[] = [];
    amenities.forEach((amenity, idx) => {
      if ((i + idx) % 2 === 0 || idx < 3) {
        hotelAmenities.push(amenity);
      }
    });

    const isFreeCancel = i % 3 !== 1;

    // Build room inventory
    const rooms: Room[] = roomTypes.map((type, tIdx) => {
      const roomPrice = Math.round(basePrice * type.priceMultiplier);
      return {
        id: `RM-${i}-${tIdx}`,
        name: type.name,
        maxGuests: type.maxGuests,
        size: type.size,
        mealPlan: mealPlans[tIdx % mealPlans.length],
        cancellationPolicy: cancellationPolicies[tIdx % cancellationPolicies.length],
        pricePerNight: roomPrice
      };
    });

    // Populate galleries with shifted index images to look distinct
    const gallery = Array.from({ length: 8 }).map((_, gIdx) => {
      return hotelImages[(i + gIdx) % hotelImages.length];
    });

    hotels.push({
      id: `HT-${locationName.substring(0,3).toUpperCase()}-${1000 + i}`,
      name,
      stars,
      location: `${area}, ${location}`,
      area,
      distance,
      description: `Experience luxury at the heart of ${locationName}. This premium hotel offers refined guest accommodations, full leisure facilities, and world-class service curated for the discerning globetrotter. Enjoy fine dining options and quick access to local architectural landmarks.`,
      rating,
      reviewsCount,
      image: gallery[0],
      gallery,
      amenitiesList: hotelAmenities,
      freeCancellation: isFreeCancel,
      pricePerNight: rooms[0].pricePerNight,
      rooms
    });
  }

  return hotels;
};
