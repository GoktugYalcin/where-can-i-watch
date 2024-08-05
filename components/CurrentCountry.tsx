"use client";

import React, { useEffect, useState } from "react";
import ky from "ky";
import { AnimatedShinyTextWrapper } from "@/components/AnimatedShinyTextWrapper";
import CountryWrapper from "@/components/CountryWrapper";
import BlurFade from "@/components/BlurFade";

export async function CurrentCountry() {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    ky("https://api.country.is/")
      .json<{
        country: string;
      }>()
      .then((res) => setCountry(res.country));
  }, []);

  return (
    <BlurFade
      delay={0.1}
      className="lg:fixed sticky w-full flex lg:justify-start justify-center items-center bottom-5 lg:left-8"
    >
      <AnimatedShinyTextWrapper>
        <span className="flex justify-center items-center gap-2">
          {!!country ? (
            <>
              <span>You are connecting from:</span>
              <CountryWrapper country={country} />
            </>
          ) : (
            <span>Loading...</span>
          )}
        </span>
      </AnimatedShinyTextWrapper>
    </BlurFade>
  );
}

export default CurrentCountry;
