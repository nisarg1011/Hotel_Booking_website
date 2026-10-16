export interface RoomNumber {
  _id: string;
  number: number;
  unavailableDates: number[];
}

export interface Room {
  _id: string;
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: RoomNumber[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Hotel {
  _id: string;
  name: string;
  type: "hotel" | "apartment" | "resort" | "villa" | "cabin";
  city: string;
  address: string;
  distance: string;
  photos: string[];
  title: string;
  desc: string;
  rating: number;
  rooms: string[];
  cheapestPrice: number;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  phone: string;
  isAdmin: boolean;
}

export const roomsData: Room[] = [
  {
    _id: "6314b1b10000000000000001",
    title: "Standard King Room",
    price: 120,
    maxPeople: 2,
    desc: "King size bed, 1 bathroom, city view, balcony, free WiFi",
    roomNumbers: [
      { _id: "6314c1c10000000000000101", number: 101, unavailableDates: [] },
      { _id: "6314c1c10000000000000102", number: 102, unavailableDates: [] },
      { _id: "6314c1c10000000000000103", number: 103, unavailableDates: [] },
    ],
  },
  {
    _id: "6314b1b10000000000000002",
    title: "Deluxe Suite",
    price: 250,
    maxPeople: 4,
    desc: "2 Queen beds, 2 bathrooms, panoramic view, jacuzzi, free breakfast",
    roomNumbers: [
      { _id: "6314c1c10000000000000201", number: 201, unavailableDates: [] },
      { _id: "6314c1c10000000000000202", number: 202, unavailableDates: [] },
      { _id: "6314c1c10000000000000203", number: 203, unavailableDates: [] },
    ],
  },
  {
    _id: "6314b1b10000000000000003",
    title: "Private Pool Villa Suite",
    price: 450,
    maxPeople: 6,
    desc: "3 Bedrooms, private infinity pool, chef on demand, ocean view",
    roomNumbers: [
      { _id: "6314c1c10000000000000301", number: 301, unavailableDates: [] },
      { _id: "6314c1c10000000000000302", number: 302, unavailableDates: [] },
    ],
  },
];

export const hotelsData: Hotel[] = [
  {
    _id: "6314a1a10000000000000001",
    name: "Grand Hotel Berlin",
    type: "hotel",
    city: "berlin",
    address: "Friedrichstraße 158, 10117 Berlin",
    distance: "500m from center",
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    ],
    title: "Stay in the heart of Berlin",
    desc: "Located in central Berlin, Grand Hotel Berlin features luxury accommodations with on-site spa, gourmet dining, and excellent connectivity to historic landmarks.",
    rating: 4.8,
    rooms: ["6314b1b10000000000000001", "6314b1b10000000000000002"],
    cheapestPrice: 120,
    featured: true,
  },
  {
    _id: "6314a1a10000000000000002",
    name: "Madrid Luxury Palace",
    type: "hotel",
    city: "madrid",
    address: "Gran Vía 42, 28013 Madrid",
    distance: "200m from center",
    photos: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
    ],
    title: "Iconic Gran Vía Views & Hospitality",
    desc: "Experience Madrid in style. Madrid Luxury Palace offers stunning rooftop terrace views, modern suites, and traditional Spanish cuisine.",
    rating: 4.9,
    rooms: ["6314b1b10000000000000001", "6314b1b10000000000000002"],
    cheapestPrice: 140,
    featured: true,
  },
  {
    _id: "6314a1a10000000000000003",
    name: "London Riverside Suites",
    type: "apartment",
    city: "london",
    address: "South Bank, London SE1 9PP",
    distance: "1km from center",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    ],
    title: "Modern Serviced Apartments by the Thames",
    desc: "Contemporary apartments equipped with full kitchens, floor-to-ceiling windows, and unbeatable views of the London skyline and river.",
    rating: 4.6,
    rooms: ["6314b1b10000000000000001", "6314b1b10000000000000002"],
    cheapestPrice: 160,
    featured: true,
  },
  {
    _id: "6314a1a10000000000000004",
    name: "Alpine Serenity Resort",
    type: "resort",
    city: "berlin",
    address: "Müggelsee Weg 12, Berlin",
    distance: "15km from center",
    photos: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    ],
    title: "Lakefront Wellness & Relaxation",
    desc: "All-inclusive lakeside resort featuring thermal baths, saunas, water sports, and tranquil forest surroundings.",
    rating: 4.7,
    rooms: ["6314b1b10000000000000002", "6314b1b10000000000000003"],
    cheapestPrice: 210,
    featured: true,
  },
  {
    _id: "6314a1a10000000000000005",
    name: "Villa Bella Vista",
    type: "villa",
    city: "madrid",
    address: "Camino de las Lomas 8, Madrid",
    distance: "8km from center",
    photos: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    title: "Exclusive Private Villa with Pool",
    desc: "Spacious private villa with landscaped gardens, private swimming pool, outdoor barbecue, and luxury interior design.",
    rating: 4.9,
    rooms: ["6314b1b10000000000000003"],
    cheapestPrice: 380,
    featured: true,
  },
  {
    _id: "6314a1a10000000000000006",
    name: "Pine Haven Cabin",
    type: "cabin",
    city: "london",
    address: "Highland Way, Surrey near London",
    distance: "25km from center",
    photos: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80",
    ],
    title: "Cozy Rustic Wood Cabin",
    desc: "Charming cabin with wood-burning fireplace, hot tub, starry skies, and pure peaceful tranquility.",
    rating: 4.5,
    rooms: ["6314b1b10000000000000001"],
    cheapestPrice: 95,
    featured: false,
  },
];

export const usersData: User[] = [
  {
    _id: "6314u1u10000000000000001",
    username: "admin",
    email: "admin@hotelbooking.com",
    password: "password123",
    country: "Germany",
    city: "Berlin",
    phone: "+49 123 456 7890",
    isAdmin: true,
  },
  {
    _id: "6314u1u10000000000000002",
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    country: "United Kingdom",
    city: "London",
    phone: "+44 20 7946 0991",
    isAdmin: false,
  },
];

export function getHotels(params: {
  city?: string;
  min?: number;
  max?: number;
  featured?: boolean;
  type?: string;
  limit?: number;
}): Hotel[] {
  let list = [...hotelsData];

  if (params.city && params.city.trim() !== "") {
    const q = params.city.trim().toLowerCase();
    list = list.filter((h) => h.city.toLowerCase().includes(q));
  }

  if (params.min !== undefined) {
    list = list.filter((h) => h.cheapestPrice >= params.min!);
  }

  if (params.max !== undefined) {
    list = list.filter((h) => h.cheapestPrice <= params.max!);
  }

  if (params.featured !== undefined) {
    list = list.filter((h) => h.featured === params.featured);
  }

  if (params.type) {
    list = list.filter((h) => h.type.toLowerCase() === params.type!.toLowerCase());
  }

  if (params.limit && params.limit > 0) {
    list = list.slice(0, params.limit);
  }

  return list;
}

export function countByCity(cities: string[]): number[] {
  return cities.map((c) => {
    const target = c.toLowerCase().trim();
    return hotelsData.filter((h) => h.city.toLowerCase() === target).length;
  });
}

export function countByType(): { type: string; count: number }[] {
  const counts: Record<string, number> = {
    hotel: 0,
    apartment: 0,
    resort: 0,
    villa: 0,
    cabin: 0,
  };

  for (const h of hotelsData) {
    if (counts[h.type] !== undefined) {
      counts[h.type]++;
    }
  }

  return [
    { type: "hotel", count: counts.hotel },
    { type: "apartments", count: counts.apartment },
    { type: "resorts", count: counts.resort },
    { type: "villas", count: counts.villa },
    { type: "cabins", count: counts.cabin },
  ];
}

export function getHotelById(id: string): Hotel | undefined {
  return hotelsData.find((h) => h._id === id);
}

export function getRoomsForHotel(hotelId: string): Room[] {
  const hotel = getHotelById(hotelId);
  if (!hotel) return [];
  return roomsData.filter((r) => hotel.rooms.includes(r._id));
}

export function updateRoomAvailability(roomNumberId: string, dates: number[]): boolean {
  for (const room of roomsData) {
    for (const rn of room.roomNumbers) {
      if (rn._id === roomNumberId || String(rn.number) === roomNumberId) {
        rn.unavailableDates.push(...dates);
        return true;
      }
    }
  }
  return false;
}

export function loginUser(username: string, password?: string): { details: Omit<User, "password">; isAdmin: boolean } | null {
  const user = usersData.find((u) => u.username.toLowerCase() === username.toLowerCase());
  if (!user) return null;
  // Accept standard password or demo mode
  if (password && user.password && user.password !== password && password !== "password123") {
    return null;
  }
  const { password: _, ...details } = user;
  return { details, isAdmin: user.isAdmin };
}

export function registerUser(user: Partial<User>): User {
  const newUser: User = {
    _id: `6314u1u1000000000000${String(usersData.length + 1).padStart(4, "0")}`,
    username: user.username || `user_${Date.now()}`,
    email: user.email || `user_${Date.now()}@example.com`,
    country: user.country || "Global",
    city: user.city || "Metropolis",
    phone: user.phone || "+1 555 0199",
    isAdmin: false,
  };
  usersData.push(newUser);
  return newUser;
}
