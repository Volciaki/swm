import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/ui/providers";
import { ABeeZee } from "next/font/google";

export const metadata: Metadata = {
	title: "Simple Warehouse Management",
	description: "Simple Warehouse Management (SWM) is a service specializing in managing your storage easily.. simple.",
};

const aBeeZee = ABeeZee({
	variable: "--font-default",
	weight: "400"
})

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
	<Providers>
		<html lang="en">
			<body className={`${aBeeZee.variable}`}>
				{children}
			</body>
		</html>
	</Providers>
);

export default RootLayout;
