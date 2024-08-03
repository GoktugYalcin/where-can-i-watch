'use client'

import {Inconsolata} from "next/font/google";
import BlurFade from "@/components/BlurFade";
import GeneratedSelect from "@/components/GeneratedSelect";
import {LetterPullUp} from "@/components/LetterPullUp";

const inconsolata = Inconsolata({ subsets: ["latin"] })
export default function Home() {
  return (
    <main className="min-h-screen">
        <BlurFade delay={0.6} inView className="flex flex-col items-center justify-start gap-12 p-24 z-3">
            <div className={`z-10 w-full max-w-5xl flex-col items-center justify-center text-5xl font-semibold text-center lg:flex ${inconsolata.className}`}>
                <LetterPullUp title='Search the show or film and figure' />
                <LetterPullUp title='it out "Where can I watch?"' />
            </div>
            <div className='z-20 w-full flex justify-center items-center'>
                <GeneratedSelect />
            </div>
        </BlurFade>
    </main>
  );
}
