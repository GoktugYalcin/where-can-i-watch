import { NextRequest } from "next/server";
import ky from "ky";

export async function GET(request: NextRequest) {
  const res = await ky(
    `https://api.country.is/${(request.headers.get("x-forwarded-for") as string) ?? ""}`,
  ).json<{
    country: string;
  }>();
  return Response.json({
    ...res,
  });
}
