import { geolocation } from "@vercel/functions";

export async function GET(request: Request) {
  const geo = geolocation(request);
  console.log({
    geo: geo.country,
    flag: geo.flag,
    ge: geo.countryRegion,
    io: request.headers.get("x-forwarded-for"),
  });
  return Response.json({
    country: geo.country ?? "FR",
  });
}
