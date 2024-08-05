import { useMemo } from "react";
import Image from "next/image";
import { components, OptionProps } from "react-select";
import { TMDBResult } from "@/types/TMDB";

export const GeneratedOption = (props: OptionProps<TMDBResult>) => {
  const data = props.data as TMDBResult;

  const dataName = useMemo(() => {
    switch (data.media_type) {
      case "movie":
        return data.name ?? data.original_title;
      case "tv":
        return data.name ?? data.original_name;
      default:
        return "";
    }
  }, [data]);

  const imageUrl = useMemo(
      () => `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      [data]
  );

  return (
      <components.Option
          className="!bg-slate-50 hover:!bg-slate-100 !w-full hover:!shadow !transition-colors !rounded-lg !mb-2 !cursor-pointer"
          {...props as any}
      >
        <div className="flex justify-start items-center w-full gap-3">
          {!!data.poster_path ? (
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
                    viewBox="0 0 20 18
