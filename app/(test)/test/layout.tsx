import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime Video Players",
  description: "anime video player with subtitle",
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
