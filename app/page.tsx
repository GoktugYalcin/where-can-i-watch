"use client";

import { Inconsolata } from "next/font/google";
import BlurFade from "@/components/BlurFade";
import GeneratedSelect from "@/components/GeneratedSelect";
import { LetterPullUp } from "@/components/LetterPullUp";
import { useEntityBear } from "@/bear/entityBear";
import Imprint from "@/components/Imprint";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export default function Home() {
  const selectedEntity = useEntityBear((s) => s.selectedEntity);
  return (
    <main className="min-h-screen">
      <BlurFade
        delay={0.6}
        inView
        className="flex flex-col items-center justify-start gap-12 lg:p-24 px-2 pt-12 pb-4 z-3 min-h-screen"
      >
        <div
          className={`z-10 w-full max-w-5xl flex-col items-center justify-center lg:text-5xl text-2xl font-semibold text-center lg:flex ${inconsolata.className}`}
        >
          <LetterPullUp title="Search the show or film and figure" />
          <LetterPullUp title='it out "Where can I watch?"' />
        </div>
        <div className="z-20 w-full flex justify-center items-center">
          <GeneratedSelect />
        </div>
        <div className="z-10 lg:w-3/4 w-full flex justify-center items-center mt-10">
          {!!selectedEntity && <Imprint />}
        </div>
      </BlurFade>
    </main>
  );
}
