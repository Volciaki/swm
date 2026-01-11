import styles from "./index.module.scss";
import { Button } from "./../../atoms/Button/index";
import { navbarRoutes } from "@/utils/routes";

const NavigationBar = () => {
	// To Khenzii: Da się zrobić żeby w <h1> kontent był zależny od specyficznego atomu/konfiguracji/zmiennej?
	// TODO: "Przycisk" 'zaloguj się' też jest routem ale konfliktuje on obecnie z automatyczną listą
	return (
		<nav className={styles["navbar"]}>
			<div className={styles["title"]}>
				<h1>SWM</h1>
			</div>
			<li>
				{navbarRoutes.map((route, index) => (
					<a href={route.path} key={`route-${index}`}>{route.text}</a>
				))}
			</li>
      <Button variant="primary">Zaloguj Się</Button>
		</nav>
	)
};

export default NavigationBar;
