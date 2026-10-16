import { getHotelById } from "../../_db";

export const onRequest = async (context: any) => {
  const { request, params } = context;
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const id = params.id as string;
  const hotel = getHotelById(id);
  if (!hotel) {
    return new Response(JSON.stringify({ success: false, message: "Hotel not found" }), {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(hotel), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};
