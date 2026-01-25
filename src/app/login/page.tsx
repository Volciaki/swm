"use client";

import { type FC } from "react";
import { NavigationBar } from "@/ui/organisms";
import { LoginForm } from "@/ui/molecules/LoginForm";
import styles from "@/styles/login.module.scss";

const Login: FC = () => {
	return (
		<>
			<NavigationBar />
			<div className={styles["container"]}>
				<LoginForm onClick={()=>alert("Clicked")} />
			</div>
		</>
	)
};

export default Login;
