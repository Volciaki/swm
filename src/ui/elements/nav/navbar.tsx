import styles from  "@/styles/home.module.scss";

const Navbar = () => {
  // SID - Secure Internal Database v6 :)
    return (
        <nav className={styles["navbar"]}>
          <div className={styles["title"]}>
            <h1>SIDv6</h1>
          </div>
          <li>
            <a href="#">Strona Główna</a>
            <a href="#">O nas</a>
            <a href="#">Kontakt</a>
          </li>
          <a href="#" className={styles["button"]}>Zaloguj Się</a>
        </nav>
    )
};

export default Navbar;
