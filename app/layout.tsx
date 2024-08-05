import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import HeaderButton from "@/components/HeaderButton";
import { cn, getCountryFlag } from "@/lib/utils";
import GridPattern from "@/components/GridPattern";
import React, { Suspense } from "react";
import CurrentCountry from "@/components/CurrentCountry";
import { AnimatedShinyTextWrapper } from "@/components/AnimatedShinyTextWrapper";
import Head from "next/head";

const dm = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT_KEY}`}
          crossOrigin="anonymous"
        ></script>
      </Head>
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
            <span className="sticky w-fit ml-12 bottom-5">
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
