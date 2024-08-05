export type TMDBMultiSearchResult = {
  page: number;
  results: TMDBResult[];
  total_results: number;
  total_pages: number;
};

export type TMDBResult = MovieResult | TVResult;

export type MovieResult = {
  media_type: "movie";
  id: number;
  title: string;
  name: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};

export type TVResult = {
  media_type: "tv";
  id: number;
  name: string;
  original_name: string;
  first_air_date: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};

// Provider type for both movies and TV shows
type Provider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
};

// Types for different provider categories
export type StreamProvider = Provider & {
  type: "flatrate" | "subscription";
};

export type RentProvider = Provider & {
  type: "rent";
};

export type BuyProvider = Provider & {
  type: "buy";
};

export type FreeProvider = Provider & {
  type: "free";
};

// Combine all provider types
export type AnyProvider =
  | StreamProvider
  | RentProvider
  | BuyProvider
  | FreeProvider;

// Country-specific provider information
export type CountryProviders = {
  link: string;
  flatrate?: StreamProvider[];
  rent?: RentProvider[];
  buy?: BuyProvider[];
  free?: FreeProvider[];
  subscription?: StreamProvider[];
};

// Overall provider results structure
export type ProviderResults = {
  id: number;
  results: {
    [countryCode: string]: CountryProviders;
  };
};
