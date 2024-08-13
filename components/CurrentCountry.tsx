"use client";

import React, { useEffect, useState } from "react";
import ky from "ky";
import { AnimatedShinyTextWrapper } from "@/components/AnimatedShinyTextWrapper";
import CountryWrapper from "@/components/CountryWrapper";
import BlurFade from "@/components/BlurFade";
import toast from "react-hot-toast";

export function CurrentCountry() {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    window.addEventListener("offline", () => setCountry("error"));
    ky("https://api.country.is/")
      .json<{
        country: string;
      }>()
      .then((res) => setCountry(res.country))
      .catch(() => setCountry("error"));
  }, []);

  useEffect(() => {
    if (country === "error") {
      toast.error(
        "Your AdBlocker blocked our request or network is not stable. Please try again later.",
        {
          duration: Infinity,
          className: "mobile-toast",
        },
      );
      document.body.classList.add("grayscale");
      document.body.style.pointerEvents = "none";
      document.body.style.userSelect = "none";
    }
  }, [country]);

  return (
    <BlurFade
      delay={0.1}
      className="lg:fixed sticky w-fit flex lg:justify-start justify-center items-center bottom-5 lg:left-8 left-3"
    >
      <AnimatedShinyTextWrapper>
        <span className="flex justify-center items-center gap-2">
          {!!country && country !== "error" ? (
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
