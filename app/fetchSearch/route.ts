import ky from "ky";
import { TMDBMultiSearchResult } from "@/types/TMDB";
import { GenerateQueryParams } from "@/lib/utils/GenerateQueryParams";

export async function POST(request: Request) {
  const { query = "" } = await request.json();
  const queryParams = {
    query: query,
    include_adult: "true",
    page: "1",
    exclude: "person",
    api_key: process.env.MOVIEDB_API_KEY!,
  };

  const BASE_URL = "https://api.themoviedb.org/3/search/multi";

  const res = await ky
    .get(BASE_URL.concat(GenerateQueryParams(queryParams)))
    .json<TMDBMultiSearchResult>();
  const filteredRes: TMDBMultiSearchResult = {
    ...res,
    results: res.results.filter((i) => i.media_type !== "person"),
  };

  return Response.json({ ...filteredRes });
}
