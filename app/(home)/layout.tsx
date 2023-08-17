import "../_style/globals.css";
import "../_style/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";
import { LayoutProps } from "@/utils/const";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime Video Players",
  description: "anime video player with subtitle",
};

export default function RootLayout(props: LayoutProps) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <Providers>{children}</Providers>
        <Script
          type="module"
          defer
          src="/script/main.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
