import React from "react";
import Image from "next/image";
import { ImprintWatchCategoriesProps } from "@/types/ImprintWatchCategoriesProps";

const ImprintWatchCategories: React.FC<ImprintWatchCategoriesProps> = ({
  type = "free",
  providersByCountry,
  title,
  color,
}) => {
  return (
    !!providersByCountry[type]?.length &&
    providersByCountry[type].map((i, index) => {
      const logoPath = `https://image.tmdb.org/t/p/w500${i.logo_path}`;
      return (
        <div
          key={i.logo_path}
          className="flex justify-start border w-72 drop-shadow-md border-slate-300 rounded-xl gap-5 text-slate-50 items-center font-semibold overflow-hidden"
        >
          <Image
            src={logoPath}
            width={80}
            height={80}
            alt={i.provider_name + "'s logo"}
          />
          <div className="flex flex-col justify-center items-start gap-1">
            <span className="pr-5 text-black">{i.provider_name}</span>
            <span
              className="px-3 py-1 text-white text-xs font-semibold rounded-full bg-slate-700"
              style={{ backgroundColor: color }}
            >
              {title}
            </span>
          </div>
        </div>
      );
    })
  );
};

export default ImprintWatchCategories;
