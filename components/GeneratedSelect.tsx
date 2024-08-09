import React, { useId, useRef } from "react";
import AsyncSelect from "react-select/async";
import ky from "ky";
import {
  MovieResult,
  ProviderResults,
  TMDBMultiSearchResult,
  TMDBResult,
  TVResult,
} from "@/types/TMDB";
import { GeneratedOption } from "@/components/GeneratedOption";
import { useEntityBear } from "@/bear/entityBear";
import { GeneratedValue } from "@/components/GeneratedValue";
import { debounce } from "next/dist/server/utils";
import { useDebouncedCallback } from "use-debounce";

const components = {
  DropdownIndicator: null,
  Option: GeneratedOption,
  SingleValue: GeneratedValue,
};

const GeneratedSelect = () => {
  const selectRef = useRef<any>(null);
  const selectedEntity = useEntityBear((s) => s.selectedEntity);
  const selectedCountry = useEntityBear((s) => s.selectedCountry);
  const updateEntity = useEntityBear((s) => s.updateEntity);
  const updateIsLoading = useEntityBear((s) => s.updateIsLoading);
  const updateProviders = useEntityBear((s) => s.updateProviders);

  const [inputValue, setInputValue] = React.useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const getFromQuery = useDebouncedCallback(
    async (query: string, callback: (res: TMDBResult[]) => void) => {
      const results = await ky
        .post("/fetchSearch", { json: { query }, cache: "force-cache" })
        .json<TMDBMultiSearchResult>();
      callback(results.results);
    },
    500,
  );

  return (
    <AsyncSelect
      ref={selectRef as any}
      loadOptions={(query, callback) => {
        if (!query) {
          callback([]);
        }
        getFromQuery(query, callback);
      }}
      getOptionLabel={(opt: MovieResult | TVResult) => opt.name}
      getOptionValue={(opt: any) => ("id" in opt ? opt.id.toString() : "0")}
      instanceId={useId()}
      cacheOptions
      components={components}
      isDisabled={!selectedCountry}
      inputValue={inputValue}
      menuIsOpen={isMenuOpen}
      isClearable={true}
      onInputChange={(newValue) => setInputValue(newValue)}
      onChange={(val) => {
        updateIsLoading(true);
        if (selectRef.current) {
          selectRef.current.blur();
        }
        if (!!val) {
          updateEntity(val as TMDBResult);
          ky.post("/fetchProviders", {
            json: {
              type: (val as TMDBResult).media_type,
              id: (val as TMDBResult).id,
              country: selectedCountry,
            },
            cache: "force-cache",
          })
            .json<ProviderResults>()
            .then((res) => {
              updateIsLoading(false);
              updateProviders(res);
            });
        } else {
          updateEntity(null);
          window.scrollTo({ behavior: "smooth", top: 0 });
        }
      }}
      placeholder={"Search..."}
      classNames={{
        control: () =>
          "flex text-xl border border-slate-300 w-3/4 shadow-md !rounded-[50px] px-3 py-3 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 transition-all !cursor-pointer",
        container: () =>
          `container ${!selectedCountry ? "container__disabled" : ""}`,
        menuList: () => `!w-full`,
        menu: () =>
          "flex text-xl border border-slate-300 !w-3/4 shadow-md !rounded-lg px-3 py-3 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 transition-all !cursor-pointer search",
      }}
      onMenuClose={() => setIsMenuOpen(false)}
      onMenuOpen={() => setIsMenuOpen(true)}
      value={selectedEntity ?? null}
    />
  );
};

export default GeneratedSelect;
