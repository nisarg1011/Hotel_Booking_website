import { usersData } from "../_db";

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

  const sanitized = usersData.map(({ password, ...u }) => u);
  return new Response(JSON.stringify(sanitized), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};
