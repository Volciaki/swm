import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/ui/providers";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Simple Warehouse Management",
	description: "Simple Warehouse Management (SWM) is a service specializing in managing your storage easily.. simple.",
};

const interFont = Inter({
	weight: "variable",
	subsets: ["latin"],
	display: "swap",
});

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
	<Providers>
		<html lang="pl">
			<body className={interFont.className}>
				{children}
			</body>
		</html>
	</Providers>
);

export default RootLayout;
