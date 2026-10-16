import { updateRoomAvailability } from "../../_db";

export const onRequest = async (context: any) => {
  const { request, params } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method === "PUT") {
    const id = params.id as string;
    try {
      const body = (await request.json()) as { dates?: number[] };
      updateRoomAvailability(id, body.dates || []);
      return new Response(JSON.stringify("Room status has been updated."), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    } catch {
      return new Response(JSON.stringify({ success: false, message: "Invalid payload" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};
