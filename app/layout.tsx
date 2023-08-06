import "./_style/globals.css";
import "./_style/style.css";
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
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></Script>
      <Script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></Script>
      <body className={inter.className + " relative"}>
        <Providers>{children}</Providers>
        <Script defer src="/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
