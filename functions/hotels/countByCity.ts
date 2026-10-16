import { countByCity } from "../_db";

export const onRequest = async (context: any) => {
  const { request } = context;
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const url = new URL(request.url);
  const citiesParam = url.searchParams.get("cities") || "";
  const cities = citiesParam ? citiesParam.split(",").map((c: string) => c.trim()) : [];
  const counts = countByCity(cities);

  return new Response(JSON.stringify(counts), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};
