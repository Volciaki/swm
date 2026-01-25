"use client";

import { type FC } from "react";
import styles from "@/styles/home.module.scss";
import Navbar from "@/ui/organisms/NavigationBar";

const Home: FC = () => (
	<>
		<Navbar />

		<img
			src={"https://logit.com.pl/wp-content/uploads/2021/07/shutterstock_396462703-1024x683.jpg"}
			alt={"Logistyka"}
			className={styles["backgroundImage"]}
		/>

		<div className={styles["container"]}>
			<p className={styles["text"]}>{":3"}</p>
		</div>
	</>
);

export default Home;
