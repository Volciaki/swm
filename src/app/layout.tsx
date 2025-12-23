import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/ui/providers";
// TODO: Choose a font later.
// import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
    title: "Magazyn (?)",
    description: "???",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
    <Providers>
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    </Providers>
);

export default RootLayout;
