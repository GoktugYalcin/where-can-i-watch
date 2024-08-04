"use client";

import React, { useEffect } from "react";
import { useEntityStore } from "@/bear/entityBear";
import { getCountryFlag } from "@/lib/utils";

const CountryWrapper: React.FC<{ country: string }> = ({ country }) => {
  const updateCountry = useEntityStore((s) => s.updateCountry);
  const selectedCountry = useEntityStore((s) => s.selectedCountry);

  useEffect(() => {
    if (!!country) {
      updateCountry(country);
    }
  }, [country]);

  return (
    selectedCountry && (
      <span className="text-lg">{getCountryFlag(selectedCountry)}</span>
    )
  );
};

export default CountryWrapper;
