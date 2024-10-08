import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import HeaderButton from "@/components/HeaderButton";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/GridPattern";
import React, { Suspense } from "react";
import CurrentCountry from "@/components/CurrentCountry";
import { AnimatedShinyTextWrapper } from "@/components/AnimatedShinyTextWrapper";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const dm = DM_Sans({ subsets: ["latin"] });

const APP_NAME = "Where Can I Watch?";
const APP_DEFAULT_TITLE = "Where Can I Watch?";
const APP_TITLE_TEMPLATE = "%s - Where Can I Watch?";
const APP_DESCRIPTION =
  "The provider finder for your favourite show, series and movies.";

export const metadata: Metadata = {
  title: APP_DEFAULT_TITLE,
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍿</text></svg>",
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm.className}>
        <Toaster />
        <Analytics />
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
