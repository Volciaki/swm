import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Providers } from "@/ui/providers";
import { NavigationBar, ToastContainer } from "@/ui/organisms";
import { CenteredOnPage } from "@/ui/molecules";
import styles from "../styles/layout.module.scss";
import "../styles/global.scss";

export const metadata: Metadata = {
	title: "SWM - Simple Warehouse Management",
	description: "SWM is a service specializing in managing your storage easily.. simple.",
};

const interFont = Inter({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
	<Providers>
		<html lang="pl">
			<body className={interFont.className}>
				<nav className={styles["navigation"]}>
					<NavigationBar />
				</nav>

				<div className={styles["navigation-margin"]} />

				<ToastContainer />

				<main className={styles["content-container"]}>
					<div className={styles["content-wrapper"]}>
						<CenteredOnPage>{children}</CenteredOnPage>
					</div>
				</main>
			</body>
		</html>
	</Providers>
);

export default RootLayout;
