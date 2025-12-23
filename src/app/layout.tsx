import type { Metadata } from "next";
import type { ReactNode } from "react";
// TODO: Choose a font later.
// import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Magazyn (?)",
  description: "???",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
);

export default RootLayout;
