"use client";

import { type FC } from "react";
import { apiClient } from "@/ui/providers";
import styles from "../styles/home.module.scss";

const Home: FC = () => {
    const { data } = apiClient.hello.useQuery({ text: "test" });

    return (
        <div className={styles["container"]}>
            <img
                src={"https://files.khenzii.dev/exploding-ryo.gif"}
                alt={"Ryo"}
                style={{ maxHeight: "300px" }}
            />
            <p className={styles["text"]}>{":3"}</p>
            <p className={styles["text"]}>{`${data?.greeting}`}</p>
        </div>
    )
};

export default Home;
