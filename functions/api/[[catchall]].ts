import {
  getHotels,
  countByCity,
  countByType,
  getHotelById,
  getRoomsForHotel,
  updateRoomAvailability,
  loginUser,
  registerUser,
  usersData,
} from "../_db";

export const onRequest = async (context: any) => {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Strip /api prefix
  const path = url.pathname.replace(/^\/api/, "");

  if (path === "/hotels/countByCity") {
    const citiesParam = url.searchParams.get("cities") || "";
    const cities = citiesParam ? citiesParam.split(",").map((c: string) => c.trim()) : [];
    return new Response(JSON.stringify(countByCity(cities)), {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });
  }

  if (path === "/hotels/countByType") {
    return new Response(JSON.stringify(countByType()), {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });
  }

  if (path.startsWith("/hotels/find/")) {
    const id = path.replace("/hotels/find/", "");
    const hotel = getHotelById(id);
    if (!hotel) {
      return new Response(JSON.stringify({ success: false, message: "Hotel not found" }), {
        status: 404,
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(hotel), {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });
  }

  if (path.startsWith("/hotels/room/")) {
    const id = path.replace("/hotels/room/", "");
    const rooms = getRoomsForHotel(id);
    return new Response(JSON.stringify(rooms), {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });
  }

  if (path === "/hotels" || path === "/hotels/") {
    if (request.method === "GET") {
      const city = url.searchParams.get("city") || "";
      const min = url.searchParams.get("min") ? Number(url.searchParams.get("min")) : undefined;
      const max = url.searchParams.get("max") ? Number(url.searchParams.get("max")) : undefined;
      const featured = url.searchParams.get("featured");
      const type = url.searchParams.get("type") || undefined;
      const limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : undefined;

      const data = getHotels({
        city,
        min,
        max,
        featured: featured === "true" ? true : featured === "false" ? false : undefined,
        type,
        limit,
      });

      return new Response(JSON.stringify(data), {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      });
    }
  }

  if (path.startsWith("/rooms/availability/")) {
    if (request.method === "PUT") {
      const id = path.replace("/rooms/availability/", "");
      try {
        const body = (await request.json()) as { dates?: number[] };
        updateRoomAvailability(id, body.dates || []);
        return new Response(JSON.stringify("Room status has been updated."), {
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ success: false, message: "Invalid payload" }), {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        });
      }
    }
  }

  if (path === "/auth/login") {
    if (request.method === "POST") {
      try {
        const body = (await request.json()) as { username?: string; password?: string };
        const result = loginUser(body.username || "", body.password || "");
        if (!result) {
          return new Response(JSON.stringify({ success: false, message: "Wrong password or username!" }), {
            status: 400,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(result), {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Set-Cookie": `access_token=token_${Date.now()}; Path=/; HttpOnly; SameSite=Lax`,
          },
        });
      } catch {
        return new Response(JSON.stringify({ success: false, message: "Invalid payload" }), {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        });
      }
    }
  }

  if (path === "/auth/register") {
    if (request.method === "POST") {
      try {
        const body = await request.json();
        registerUser(body as any);
        return new Response("User has been created.", {
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "text/plain" },
        });
      } catch {
        return new Response(JSON.stringify({ success: false, message: "Invalid payload" }), {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
        });
      }
    }
  }

  if (path === "/users" || path === "/users/") {
    const sanitized = usersData.map(({ password, ...u }) => u);
    return new Response(JSON.stringify(sanitized), {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: false, message: "Route not found" }), {
    status: 404,
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
  });
};
