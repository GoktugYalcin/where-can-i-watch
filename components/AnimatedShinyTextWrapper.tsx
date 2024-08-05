import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/AnimatedShinyText";
import React from "react";

export const AnimatedShinyTextWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="z-10 flex items-center justify-start">
      <div
        className={cn(
          "group rounded-full border ml-5 border-black/5 bg-neutral-100 text-base text-white transition-all ease-in select-none hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="flex items-center">{children}</span>
        </AnimatedShinyText>
      </div>
    </div>
  );
};
