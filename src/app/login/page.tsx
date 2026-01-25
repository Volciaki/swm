"use client";

import { useEffect, type FC } from "react";
import { apiClient } from "@/ui/providers";
import styles from "@/styles/login.module.scss";
import Navbar from "@/ui/organisms/NavigationBar";
import InputLoginForm from "@/ui/molecules/loginForm";

const Home: FC = () => {
	const { data } = apiClient.hello.useQuery({ text: "test" });

	/*useEffect(() => {
        if (!data) {
            alert("Database not connected");
        }
    }, [data]);*/ // TODO Backend: Expose a return function that will respond whether the database is achievable or not.\

	// Make the login button a new atom instead. Same for It's styles.

	// Daj tutaj jakiś interaktywny background, np. paczki na skos w tle

	return (
		<>
			<Navbar />
			<div className={styles["container"]}>
				<InputLoginForm onClick={()=>alert("Clicked")} />
			</div>
		</>
	)
};

export default Home;
