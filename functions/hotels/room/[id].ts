import { getRoomsForHotel } from "../../_db";

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
  const rooms = getRoomsForHotel(id);

  return new Response(JSON.stringify(rooms), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};
