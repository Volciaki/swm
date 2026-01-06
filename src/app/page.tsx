"use client";

import { useEffect, type FC } from "react";
import { apiClient } from "@/ui/providers";
import styles from "@/styles/home.module.scss";
import Navbar from "@/ui/organisms/NavigationBar";

const Home: FC = () => {
    const { data } = apiClient.hello.useQuery({ text: "test" });

    /*useEffect(() => {
        if (!data) {
            alert("Database not connected");
        }
    }, [data]);*/ // TODO Backend: Expose a return function that will respond whether the database is achievable or not.

    return (
        <>
            <Navbar />
            <div className={styles["container"]}>
                <img
                    src={"https://files.khenzii.dev/exploding-ryo.gif"}
                    alt={"Ryo"}
                    style={{ maxHeight: "300px" }}
                />
                <p className={styles["text"]}>{":3"}</p>
                <p className={styles["text"]}>{`${data?.greeting}`}</p>
            </div>
        </>
    )
};

export default Home;
