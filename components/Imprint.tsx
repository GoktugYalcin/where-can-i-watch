import React, { useEffect, useMemo, useRef } from "react";
import { useEntityBear } from "@/bear/entityBear";
import Image from "next/image";
import Lottie, { Options } from "react-lottie";
import * as notFoundAnimation from "@/public/notFound.json";
import ImprintDivider from "@/components/ImprintDivider";
import ImprintWatchCategories from "@/components/ImprintWatchCategories";
import BlurFade from "@/components/BlurFade";
import ImprintCategoriesLoader from "@/components/ImprintCategoriesLoader";
import { getCountryFlag } from "@/lib/utils";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

export const revalidate: number = 3600;

const Imprint: React.FC<{}> = () => {
  const selectedEntity = useEntityBear((s) => s.selectedEntity);
  const isEntityLoading = useEntityBear((s) => s.isEntityLoading);
  const selectedCountry = useEntityBear((s) => s.selectedCountry);
  const scrollToDivRef = useRef<HTMLDivElement | null>(null);
  const selectedProviders = useEntityBear((s) => s.selectedProviders);

  const providersByCountry = useMemo(() => {
    return selectedProviders?.results[selectedCountry ?? "TR"] ?? null;
  }, [selectedCountry, selectedProviders]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 300 });
  }, [selectedEntity]);

  const dataName = useMemo(() => {
    switch (selectedEntity?.media_type) {
      case "movie":
        return selectedEntity.name ?? selectedEntity.original_title;
      case "tv":
        return selectedEntity.name ?? selectedEntity.original_name;
    }
  }, [selectedEntity]);

  const imageUrl = useMemo(
    () => `https://image.tmdb.org/t/p/w500${selectedEntity?.poster_path}`,
    [selectedEntity],
  );

  const isAndroid = useMemo(
    () => navigator.userAgent.indexOf("Android") > -1,
    [],
  );

  const otherCountries = useMemo(() => {
    return Object.keys(selectedProviders?.results ?? {});
  }, [selectedProviders]);

  if (!selectedEntity) {
    return <></>;
  }

  polyfillCountryFlagEmojis();

  return (
    <BlurFade className="flex flex-col lg:w-full w-[90%] justify-start items-start">
      <ImprintDivider>Imprint</ImprintDivider>
      <div
        ref={scrollToDivRef}
        className="flex justify-start items-center gap-3"
      >
        {!!selectedEntity.poster_path ? (
          <Image
            src={imageUrl}
            width={100}
            height={100}
            alt={dataName + "'s poster"}
          />
        ) : (
          <div className="flex items-center justify-center w-36 h-48 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-5 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        )}
        <div className="flex flex-col justify-center items-start gap-1">
          <span className="lg:text-md text-sm !text-slate-800 font-semibold">
            {dataName}
          </span>
          <span className="lg:!text-sm !text-xs text-slate-500">
            {selectedEntity.overview ?? "-"}
          </span>
        </div>
      </div>
      <ImprintDivider>Where Can You Watch?</ImprintDivider>
      {isEntityLoading && <ImprintCategoriesLoader />}
      {!isEntityLoading && !providersByCountry && (
        <BlurFade
          delay={0.25}
          className="flex w-full justify-center items-center lg:gap-3 gap-8 lg:mb-0 mb-16"
        >
          <div className="flex flex-col lg:w-1/2 w-3/4 justify-center items-center font-bold select-none">
            <span className="pointer-events-none">
              <Lottie
                options={
                  {
                    loop: true,
                    autoplay: true,
                    animationData: notFoundAnimation,
                  } as Options
                }
              />
            </span>
            <span>No provider at your country :(</span>
            <span>
              But in these countries below, you can watch them already!
            </span>
            <div className="flex justify-center items-center flex-wrap gap-2 text-3xl mt-3">
              {otherCountries.map((country, index) => (
                <BlurFade
                  delay={otherCountries.length >= 30 ? 0 : index * 0.01}
                  key={index}
                >
                  {isAndroid ? (
                    <Image
                      src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                      alt={"flag"}
                      width={30}
                      height={20}
                    />
                  ) : (
                    getCountryFlag(country)
                  )}
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>
      )}
      {!isEntityLoading && providersByCountry && (
        <BlurFade
          delay={0.25}
          className="flex w-full flex-wrap lg:justify-start justify-center items-center lg:gap-3 gap-8 lg:mb-0 mb-16"
        >
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"free"}
            color={"#9FA0FF"}
            title={"Watch for Free"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"buy"}
            color={"#F3CA40"}
            title={"Watch to Buy"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"rent"}
            color={"#577590"}
            title={"Rent to Watch"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"subscription"}
            color={"#FC60A8"}
            title={"Need Subscription to Watch"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"flatrate"}
            color={"#918450"}
            title={"Need Flatrate to Watch"}
          />
        </BlurFade>
      )}
    </BlurFade>
  );
};

export default Imprint;
