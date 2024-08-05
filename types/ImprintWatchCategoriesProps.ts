import { CountryProviders } from "@/types/TMDB";

export type ImprintWatchCategoriesProps = {
  providersByCountry: Omit<CountryProviders, "link">;
  type: keyof Omit<CountryProviders, "link">;
  title: string;
  color: string;
};
