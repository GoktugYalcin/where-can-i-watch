import ky from "ky";
import { ProviderResults } from "@/types/TMDB";
import { GenerateQueryParams } from "@/lib/utils/GenerateQueryParams";

export async function POST(request: Request) {
  const { type = "movie", id = 0 } = await request.json();
  const queryParams = {
    api_key: process.env.MOVIEDB_API_KEY!,
  };

  const BASE_URL = `https://api.themoviedb.org/3/${type}/${id}/watch/providers`;

  const res = await ky
    .get(BASE_URL.concat(GenerateQueryParams(queryParams)))
    .json<ProviderResults>();

  return Response.json({ ...res });
}
