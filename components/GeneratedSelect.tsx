import React, { useId, useRef } from "react";
import AsyncSelect from "react-select/async";
import ky from "ky";
import {
  CountryProviders,
  ProviderResults,
  TMDBMultiSearchResult,
  TMDBResult,
} from "@/types/TMDB";
import { GeneratedOption } from "@/components/GeneratedOption";
import { useEntityStore } from "@/bear/entityBear";
import { GeneratedValue } from "@/components/GeneratedValue";
import Select from "react-select";

const components = {
  DropdownIndicator: null,
  Option: GeneratedOption,
  SingleValue: GeneratedValue,
};

export default () => {
  const selectRef = useRef<Select>(null);
  const selectedEntity = useEntityStore((s) => s.selectedEntity);
  const selectedCountry = useEntityStore((s) => s.selectedCountry);
  const updateEntity = useEntityStore((s) => s.updateEntity);
  const updateIsLoading = useEntityStore((s) => s.updateIsLoading);
  const updateProviders = useEntityStore((s) => s.updateProviders);

  const [inputValue, setInputValue] = React.useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  return (
    <AsyncSelect
      ref={selectRef as any}
      loadOptions={(query) => {
        const results = ky
          .post("/fetchSearch", { json: { query } })
          .json<TMDBMultiSearchResult>();
        return results.then((res) => res.results);
      }}
      getOptionLabel={(opt) => opt.name}
      getOptionValue={(opt) => opt.id}
      instanceId={useId()}
      components={components}
      inputValue={inputValue}
      menuIsOpen={isMenuOpen}
      isClearable={true}
      onInputChange={(newValue) => setInputValue(newValue)}
      onChange={(val) => {
        updateEntity(val as TMDBResult);
        selectRef.current.blur();
        if (!!val) {
          updateIsLoading(true);
          updateProviders(null);
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
        }
      }}
      placeholder="Search..."
      classNames={{
        control: () => "input",
        container: () => "container",
        menu: () => "input search",
      }}
      onMenuClose={() => setIsMenuOpen(false)}
      onMenuOpen={() => setIsMenuOpen(true)}
      value={selectedEntity ?? null}
    />
  );
};
