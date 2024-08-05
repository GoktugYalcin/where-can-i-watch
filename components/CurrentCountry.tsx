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

  return !!country ? (
    <>
      <BlurFade delay={0.1} className="sticky w-fit ml-12 bottom-5">
        <AnimatedShinyTextWrapper>
          <span className="flex justify-center items-center gap-2">
            <span>You are connecting from:</span>
            <CountryWrapper country={country} />
          </span>
        </AnimatedShinyTextWrapper>
      </BlurFade>
    </>
  ) : (
    <span className="sticky w-fit ml-12 bottom-5">
      <AnimatedShinyTextWrapper>
        <span>Loading...</span>
      </AnimatedShinyTextWrapper>
    </span>
  );
}

export default CurrentCountry;
