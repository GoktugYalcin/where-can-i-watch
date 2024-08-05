import React, { useMemo } from "react";
import { useEntityBear } from "@/bear/entityBear";
import Image from "next/image";
import ImprintDivider from "@/components/ImprintDivider";
import ImprintWatchCategories from "@/components/ImprintWatchCategories";

const Imprint: React.FC<{}> = () => {
  const selectedEntity = useEntityBear((s) => s.selectedEntity);
  const isEntityLoading = useEntityBear((s) => s.isEntityLoading);
  const selectedCountry = useEntityBear((s) => s.selectedCountry);
  const selectedProviders = useEntityBear((s) => s.selectedProviders);

  const providersByCountry = useMemo(() => {
    return selectedProviders?.results[selectedCountry] ?? null;
  }, [selectedCountry, selectedProviders]);

  if (!selectedEntity) {
    return <></>;
  }

  const dataName = useMemo(() => {
    switch (selectedEntity.media_type) {
      case "movie":
        return selectedEntity.name ?? selectedEntity.original_title;
      case "tv":
        return selectedEntity.name ?? selectedEntity.original_name;
    }
  }, [selectedEntity.id]);

  const imageUrl = useMemo(
    () => `https://image.tmdb.org/t/p/w500${selectedEntity.poster_path}`,
    [selectedEntity],
  );

  return (
    <div className="flex flex-col w-full justify-start items-start">
      <ImprintDivider>Imprint</ImprintDivider>
      <div className="flex justify-start items-center gap-3">
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
          <span className="text-lg">{dataName}</span>
          <span className="text-md text-slate-500">
            {selectedEntity.overview ?? "-"}
          </span>
        </div>
      </div>
      <ImprintDivider>Where Can You Watch?</ImprintDivider>
      {!isEntityLoading && providersByCountry ? (
        <div className="flex flex-col justify-start items-center gap-3">
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"free"}
            title={"Watch for Free"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"buy"}
            title={"Watch to Buy"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"rent"}
            title={"Rent to Watch"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"subscription"}
            title={"Need Subscription to Watch"}
          />
          <ImprintWatchCategories
            providersByCountry={providersByCountry}
            type={"flatrate"}
            title={"Need Flatrate to Watch"}
          />
        </div>
      ) : (
        <>loading...</>
      )}
    </div>
  );
};

export default Imprint;