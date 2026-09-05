import bcrypt from "bcryptjs";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";
import User from "./models/User.js";

export const seedDatabase = async () => {
  try {
    const hotelCount = await Hotel.countDocuments();
    if (hotelCount > 0) {
      console.log("Database already populated. Skipping seed.");
      return;
    }

    console.log("Seeding initial database data...");

    // 1. Create Rooms
    const standardRoom = await new Room({
      title: "Standard King Room",
      price: 120,
      maxPeople: 2,
      desc: "King size bed, 1 bathroom, city view, balcony, free WiFi",
      roomNumbers: [
        { number: 101, unavailableDates: [] },
        { number: 102, unavailableDates: [] },
        { number: 103, unavailableDates: [] },
      ],
    }).save();

    const deluxeRoom = await new Room({
      title: "Deluxe Suite",
      price: 250,
      maxPeople: 4,
      desc: "2 Queen beds, 2 bathrooms, panoramic view, jacuzzi, free breakfast",
      roomNumbers: [
        { number: 201, unavailableDates: [] },
        { number: 202, unavailableDates: [] },
        { number: 203, unavailableDates: [] },
      ],
    }).save();

    const luxuryVillaRoom = await new Room({
      title: "Private Pool Villa Suite",
      price: 450,
      maxPeople: 6,
      desc: "3 Bedrooms, private infinity pool, chef on demand, ocean view",
      roomNumbers: [
        { number: 301, unavailableDates: [] },
        { number: 302, unavailableDates: [] },
      ],
    }).save();

    // 2. Create Hotels
    const hotels = [
      {
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
        rooms: [standardRoom._id.toString(), deluxeRoom._id.toString()],
        cheapestPrice: 120,
        featured: true,
      },
      {
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
        rooms: [standardRoom._id.toString(), deluxeRoom._id.toString()],
        cheapestPrice: 140,
        featured: true,
      },
      {
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
        rooms: [standardRoom._id.toString(), deluxeRoom._id.toString()],
        cheapestPrice: 160,
        featured: true,
      },
      {
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
        rooms: [deluxeRoom._id.toString(), luxuryVillaRoom._id.toString()],
        cheapestPrice: 210,
        featured: true,
      },
      {
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
        rooms: [luxuryVillaRoom._id.toString()],
        cheapestPrice: 380,
        featured: true,
      },
      {
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
        rooms: [standardRoom._id.toString()],
        cheapestPrice: 95,
        featured: false,
      },
    ];

    await Hotel.insertMany(hotels);

    // 3. Create Demo Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const users = [
      {
        username: "admin",
        email: "admin@hotelbooking.com",
        password: hashedPassword,
        country: "Germany",
        city: "Berlin",
        phone: "+49 123 456 7890",
        isAdmin: true,
      },
      {
        username: "john_doe",
        email: "john@example.com",
        password: hashedPassword,
        country: "United Kingdom",
        city: "London",
        phone: "+44 20 7946 0991",
        isAdmin: false,
      },
    ];

    await User.insertMany(users);
    console.log("Database successfully seeded with demo hotels, rooms, and users!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};
