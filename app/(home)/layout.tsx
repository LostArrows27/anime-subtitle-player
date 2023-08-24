// "use client";

import "../_style/globals.css";
import "../_style/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";
import { LayoutProps } from "@/types/type";
import { ColorModeScript } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Video Players",
  description: "anime video player with subtitle",
};

export default function RootLayout(props: LayoutProps) {
  const { children } = props;
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          "relative m-0 p-0 flex flex-col items-center h-screen !bg-[#131418]"
        }
      >
        <Providers>{children}</Providers>
        <Script
          type="module"
          defer
          src="/script/main.js"
          strategy="lazyOnload"
        />
        {/* This for toggle dark mode */}
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      </body>
    </html>
  );
}
