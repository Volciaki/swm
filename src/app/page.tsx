"use client";

import { useEffect, type FC } from "react";
import { apiClient } from "@/ui/providers";
import styles from "@/styles/home.module.scss"; // Changed to relative for easier management

import Navbar from "@/ui/elements/nav/navbar";

const Home: FC = () => {
    const { data } = apiClient.hello.useQuery({ text: "test" });
    let response = data?.greeting;

    useEffect(() => {
        if (!data) {
            alert("Database not connected");
        }
    }, [data]);

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
                <p className={styles["text"]}>{`${response ? data?.greeting : null}`}</p>
            </div>
        </>
    )
};

export default Home;
