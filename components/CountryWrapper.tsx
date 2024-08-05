"use client";

import React, { useEffect } from "react";
import { useEntityBear } from "@/bear/entityBear";
import { getCountryFlag } from "@/lib/utils";

const CountryWrapper: React.FC<{ country: string }> = ({ country }) => {
  const updateCountry = useEntityBear((s) => s.updateCountry);
  const selectedCountry = useEntityBear((s) => s.selectedCountry);

  useEffect(() => {
    if (!!country) {
      updateCountry(country);
    }
  }, [country, updateCountry]);

  return (
    selectedCountry && (
      <span className="text-lg">{getCountryFlag(selectedCountry)}</span>
    )
  );
};

export default CountryWrapper;
