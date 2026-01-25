"use client";

import { type FC } from "react";
import { Paragraph } from "@/ui/atoms";
import styles from "@/styles/home.module.scss";

const Home: FC = () => (
	<>
		<div className={styles["container"]}>
			<Paragraph>{":3"}</Paragraph>
		</div>
	</>
);

export default Home;
