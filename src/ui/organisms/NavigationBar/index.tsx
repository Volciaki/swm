import clsx from "clsx";
import styles from  "./index.module.scss";
import { defaultRoutes, loggedRoutes } from "./routes";

export const NavigationBar = () => {
	// To Khenzii: Da się zrobić żeby w <h1> kontent był zależny od specyficznego atomu/konfiguracji/zmiennej?
	// TODO: "Przycisk" 'zaloguj się' też jest routem ale konfliktuje on obecnie z automatyczną listą
	return (
		<nav className={styles["navbar"]}>
			<div className={styles["title"]}>
				<h1>SWM</h1>
			</div>
			<li>
				{loggedRoutes.map((route, index) => ( // ONLY SHOW WHEN LOGGED IN
					<a href={route.path} key={`route-${index}`} className={clsx(styles["topbarButton"], styles["loggedButton"])}>{route.text}</a>
				))}
				{defaultRoutes.map((route, index) => (
					<a href={route.path} key={`route-${index}`} className={clsx(styles["topbarButton"], styles["defaultButton"])}>{route.text}</a>
				))}
			</li>
		</nav>
	)
};
