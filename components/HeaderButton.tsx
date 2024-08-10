"use client";

import React from "react";
import BlurFade from "@/components/BlurFade";
import { useRouter } from "next/navigation";

const HeaderButton: React.FC<{}> = () => {
  const router = useRouter();
  return (
    <nav className="sticky w-fit lg:top-6 lg:ml-10 top-2 left-2 z-10">
      <BlurFade
        onClick={() => router.replace("/")}
        delay={0.5}
        inView
        className="flex justify-start items-center gap-2 text-xl border border-slate-300 shadow-md rounded-xl px-3 py-3 bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 bg-[100px] hover:bg-[0px] transition-all w-fit select-none cursor-pointer"
      >
        <span className="bg-slate-800 px-2 py-1 rounded-full">🍿</span>
        <span className="font-semibold">Where Can I Watch?</span>
      </BlurFade>
    </nav>
  );
};

export default HeaderButton;
