"use client";

import { type FC } from "react";
import { CenteredOnPage, LoginForm } from "@/ui/molecules";
import { Flex } from "@/ui/atoms";
import styles from "@/styles/login.module.scss";

const Login: FC = () => {
	return (
		<CenteredOnPage>
			<LoginForm onClick={() => alert("Clicked")} />
		</CenteredOnPage>
	);
};

export default Login;
