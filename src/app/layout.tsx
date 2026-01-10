import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/ui/providers";
import { Sora } from "next/font/google";

export const metadata: Metadata = {
	title: "Simple Warehouse Management",
	description: "Simple Warehouse Management (SWM) is a service specializing in managing your storage easily.. simple.",
};

const sora = Sora({
	variable: "--font-sora",
	subsets: ["latin"],
})

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
	<Providers>
		<html lang="en">
			<body className={`${sora.variable}`}>
				{children}
			</body>
		</html>
	</Providers>
);

export default RootLayout;
