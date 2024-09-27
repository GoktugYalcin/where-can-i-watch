import { geolocation } from "@vercel/functions";

export async function GET(request: Request) {
    const geo = geolocation(request);
    return Response.json({
      country: geo.country ?? "FR",
    });
}
