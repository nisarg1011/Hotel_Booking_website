import { registerUser } from "../_db";

export const onRequest = async (context: any) => {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method === "POST") {
    try {
      const body = await request.json();
      registerUser(body as any);
      return new Response("User has been created.", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/plain",
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
