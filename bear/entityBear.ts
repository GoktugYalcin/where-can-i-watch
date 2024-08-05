import { create, createStore } from "zustand";
import {
  MovieResult,
  ProviderResults,
  TMDBResult,
  TVResult,
} from "@/types/TMDB";

interface EntitySlice {
  selectedCountry: string | null;
  selectedEntity: TMDBResult | null;
  selectedProviders: ProviderResults | null;
  isEntityLoading: boolean;
  updateEntity: (entity: TMDBResult | null) => void;
  updateProviders: (entity: ProviderResults | null) => void;
  updateCountry: (country: string) => void;
  updateIsLoading: (loading: boolean) => void;
}

export const useEntityBear = create<EntitySlice>((set) => ({
  selectedEntity: null,
  selectedCountry: null,
  selectedProviders: null,
  isEntityLoading: true,
  updateEntity: (entity) => set({ selectedEntity: entity }),
  updateIsLoading: (loading) => set({ isEntityLoading: loading }),
  updateCountry: (country) => set({ selectedCountry: country }),
  updateProviders: (providers) => set({ selectedProviders: providers }),
}));
