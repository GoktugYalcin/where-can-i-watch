import React from "react";
import ky from "ky";
import { AnimatedShinyTextWrapper } from "@/components/AnimatedShinyTextWrapper";
import CountryWrapper from "@/components/CountryWrapper";

export async function CurrentCountry() {
  let country;
  try {
    const res = await ky("https://api.country.is/").json();
    country = res.country;
  } catch (e) {
    return (
      <span className="sticky w-fit ml-12 bottom-5">
        <AnimatedShinyTextWrapper>
          <span>Loading...</span>
        </AnimatedShinyTextWrapper>
      </span>
    );
  }
  return (
    !!country && (
      <>
        <span className="sticky w-fit ml-12 bottom-5">
          <AnimatedShinyTextWrapper>
            <span className="flex justify-center items-center gap-2">
              <span>You are connecting from:</span>
              <CountryWrapper country={country} />
            </span>
          </AnimatedShinyTextWrapper>
        </span>
      </>
    )
  );
}

export default CurrentCountry;
