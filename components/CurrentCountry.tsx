import React from "react";
import ky from "ky";
import { getCountryFlag } from "@/lib/utils";
import { AnimatedShinyTextWrapper } from "@/components/AnimatedShinyTextWrapper";

export async function CurrentCountry() {
  const { country } = await ky("https://api.country.is/").json();
  return (
    !!country && (
      <>
        <span className="sticky w-fit ml-12 bottom-5">
          <AnimatedShinyTextWrapper>
            <span className="flex justify-center items-center gap-2">
              <span>You are connecting from:</span>
              <span className="text-lg">{getCountryFlag(country)}</span>
            </span>
          </AnimatedShinyTextWrapper>
        </span>
      </>
    )
  );
}

export default CurrentCountry;
