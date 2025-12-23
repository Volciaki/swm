import { type FC } from "react";
import styles from "../styles/home.module.scss";

const Home: FC = () => (
    <div className={styles["container"]}>
        <img
            src={"https://files.khenzii.dev/exploding-ryo.gif"}
            alt={"Ryo"}
            style={{ maxHeight: "300px" }}
        />
        <p className={styles["text"]}>{":3"}</p>
    </div>
);

export default Home;
