import React from "react";
import Image from "next/image";
import { CountryProviders } from "@/types/TMDB";

const ImprintWatchCategories: React.FC<{
  providersByCountry: CountryProviders;
  type: string;
  title: string;
}> = ({ type, providersByCountry, title }) => {
  return (
    !!providersByCountry[type]?.length && (
      <div className="w-full ml-8">
        <span className="px-3 py-1 text-white font-semibold rounded-full bg-slate-700">
          {title}
        </span>
        <div className="flex justify-start items-center flex-wrap my-3 gap-2">
          {providersByCountry[type].map((i) => {
            const logoPath = `https://image.tmdb.org/t/p/w500${i.logo_path}`;
            return (
              <div className="flex justify-between gap-5 w-fit text-slate-50 items-center font-semibold overflow-hidden rounded-full bg-gradient-to-br from-slate-700 to-gray-400">
                <Image
                  src={logoPath}
                  width={80}
                  height={80}
                  alt={i.provider_name + "'s logo"}
                />
                <span className="pr-5">{i.provider_name}</span>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ImprintWatchCategories;
