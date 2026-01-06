import styles from  "./index.module.scss";
import { routes } from "./routes";

const NavigationBar = () => {
  // To Khenzii: Da się zrobić żeby w <h1> kontent był zależny od specyficznego atomu/konfiguracji/zmiennej?
  // TODO: "Przycisk" 'zaloguj się' też jest routem ale konfliktuje on obecnie z automatyczną listą
    return (
        <nav className={styles["navbar"]}>
          <div className={styles["title"]}>
            <h1>SWM</h1>
          </div>
          <li>
            {routes.map((route, index) => (
                <a href={route.path} key={`route-${index}`}>{route.text}</a>
            ))}
          </li>
          <a href="#" className={styles["button"]}>Zaloguj się</a>
        </nav>
    )
};

export default NavigationBar;
