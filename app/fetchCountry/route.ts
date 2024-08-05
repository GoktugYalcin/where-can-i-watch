import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({
    country: request.headers.get("x-forwarded-for") as string,
  });
}
