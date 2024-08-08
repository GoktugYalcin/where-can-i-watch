import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import HeaderButton from "@/components/HeaderButton";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/GridPattern";
import React, { Suspense } from "react";
import CurrentCountry from "@/components/CurrentCountry";
import { AnimatedShinyTextWrapper } from "@/components/AnimatedShinyTextWrapper";

const dm = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Where Can I Watch?",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍿</text></svg>",
  description:
    "The provider finder for your favourite show, series and movies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm.className}>
        <GridPattern
          width={15}
          height={15}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] ",
          )}
        />
        <HeaderButton />
        {children}
        <Suspense
          fallback={
            <span className="lg:fixed sticky w-fit ml-12 bottom-5">
              <AnimatedShinyTextWrapper>
                <span>Loading...</span>
              </AnimatedShinyTextWrapper>
            </span>
          }
        >
          <CurrentCountry />
        </Suspense>
      </body>
    </html>
  );
}
