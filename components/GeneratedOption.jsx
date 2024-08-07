import { Suspense, useMemo } from "react";
import Image from "next/image";
import { components, OptionProps } from "react-select";
import { TMDBResult } from "@/types/TMDB";

export const GeneratedOption = (props) => {
  const data = props.data;

  const dataName = useMemo(() => {
    switch (data.media_type) {
      case "movie":
        return data.name ?? data.original_title;
      case "tv":
        return data.name ?? data.original_name;
    }
  }, [data]);

  const imageUrl = useMemo(
    () => `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    [data],
  );

  return (
    <components.Option
      className="!bg-slate-50 hover:!bg-slate-100 !w-full hover:!shadow !transition-colors !rounded-lg !mb-2 !cursor-pointer"
      {...props}
    >
      <div className="flex justify-start items-center w-full gap-3">
        {!!data.poster_path ? (
          <Suspense
            fallback={
              <svg
                className="w-5 h-10 min-w-5 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            }
          >
            <Image
              src={imageUrl}
              width={100}
              height={100}
              alt={dataName + "'s poster"}
            />
          </Suspense>
        ) : (
          <div className="flex items-center justify-center w-[100px] h-[150px] bg-gray-300 rounded dark:bg-gray-700">
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
          <span className="lg:text-md text-sm font-semibold !text-slate-800">
            {dataName}
          </span>
          <span className="lg:!text-sm !text-xs text-slate-500 !overflow-hidden !text-ellipsis lg:max-h-[initial] max-h-28">
            {data.overview ?? "-"}
          </span>
        </div>
      </div>
    </components.Option>
  );
};
