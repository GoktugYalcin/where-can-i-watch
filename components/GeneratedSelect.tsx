import React, { useId, useRef } from "react";
import AsyncSelect from "react-select/async";
import ky from "ky";
import {
  ProviderResults,
  TMDBMultiSearchResult,
  TMDBResult,
} from "@/types/TMDB";
import { GeneratedOption } from "@/components/GeneratedOption";
import { useEntityBear } from "@/bear/entityBear";
import { GeneratedValue } from "@/components/GeneratedValue";
import Select from "react-select";

const components = {
  DropdownIndicator: null,
  Option: GeneratedOption,
  SingleValue: GeneratedValue,
};

const GeneratedSelect = () => {
  const selectRef = useRef<Select>(null);
  const selectedEntity = useEntityBear((s) => s.selectedEntity);
  const selectedCountry = useEntityBear((s) => s.selectedCountry);
  const updateEntity = useEntityBear((s) => s.updateEntity);
  const updateIsLoading = useEntityBear((s) => s.updateIsLoading);
  const updateProviders = useEntityBear((s) => s.updateProviders);

  const [inputValue, setInputValue] = React.useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  return (
    <AsyncSelect
      ref={selectRef as any}
      loadOptions={(query) => {
        const results = ky
          .post("/fetchSearch", { json: { query } })
          .json<TMDBMultiSearchResult>();
        return results.then((res) => {
          return res.results;
        });
      }}
      getOptionLabel={(opt) => opt.name}
      getOptionValue={(opt) => opt.id}
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
        selectRef.current.blur();
        if (!!val) {
          updateEntity(val as TMDBResult);
          ky.post("/fetchProviders", {
            json: {
              type: (val as TMDBResult).media_type,
              id: (val as TMDBResult).id,
              country: selectedCountry,
            },
          })
            .json<ProviderResults>()
            .then((res) => {
              updateIsLoading(false);
              updateProviders(res);
            });
        } else {
          updateEntity(null as TMDBResult);
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
