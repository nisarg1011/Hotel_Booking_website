import { loginUser } from "../_db";

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
      const body = (await request.json()) as { username?: string; password?: string };
      const result = loginUser(body.username || "", body.password || "");
      if (!result) {
        return new Response(JSON.stringify({ success: false, message: "Wrong password or username!" }), {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
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
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};
