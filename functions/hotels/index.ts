import { getHotels } from "../_db";

export const onRequest = async (context: any) => {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // If this is a direct browser page navigation (Accept: text/html) without search query, pass through to SPA static assets!
  const accept = request.headers.get("accept") || "";
  if (
    request.method === "GET" &&
    accept.includes("text/html") &&
    !url.searchParams.has("city") &&
    !url.searchParams.has("featured") &&
    !url.searchParams.has("min") &&
    !url.searchParams.has("max") &&
    !url.searchParams.has("type")
  ) {
    return context.next();
  }

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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};
