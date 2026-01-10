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
    }, [data]);*/ // TODO Backend: Expose a return function that will respond whether the database is achievable or not.\

	// Make the login button a new atom instead. Same for It's styles.

	return (
		<>
			<Navbar />
			<img
				src={"https://logit.com.pl/wp-content/uploads/2021/07/shutterstock_396462703-1024x683.jpg"}
				alt={"Logistyka"}
				className={styles["backgroundImage"]}
			/>
			<div className={styles["container"]}>
				<p className={styles["text"]}>{":3"}</p>
				<p className={styles["text"]}>{`${data?.greeting}`}</p>
			</div>
		</>
	)
};

export default Home;