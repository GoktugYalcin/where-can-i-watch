import { NextRequest } from "next/server";
import ky from "ky";

export async function GET(request: NextRequest) {
  return Response.json({
    country: request.headers.get("X-Vercel-IP-Country") ?? "FR",
  });
}
