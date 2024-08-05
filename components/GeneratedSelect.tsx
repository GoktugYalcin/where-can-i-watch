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
  const isEntityLoading = useEntityBear((s) => s.isEntityLoading);
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
        return results.then((res) => res.results);
      }}
      getOptionLabel={(opt) => opt.name}
      getOptionValue={(opt) => opt.id}
      instanceId={useId()}
      components={components}
      isDisabled={!selectedCountry}
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
      placeholder={`${isEntityLoading ? "Loading" : "Search"}...`}
      isLoading={!selectedCountry || isEntityLoading}
      classNames={{
        control: () => "input",
        container: () =>
          `container ${!selectedCountry ? "container__disabled" : ""}`,
        menu: () => "input search",
      }}
      onMenuClose={() => setIsMenuOpen(false)}
      onMenuOpen={() => setIsMenuOpen(true)}
      value={selectedEntity ?? null}
    />
  );
};

export default GeneratedSelect;
