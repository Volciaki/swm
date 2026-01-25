"use client";

import { type FC } from "react";
import { LoginForm } from "@/ui/molecules";
import { Flex } from "@/ui/atoms";
// TODO: Delete this later if it won't be needed.
import styles from "@/styles/login.module.scss";

const Login: FC = () => {
	return (
		<Flex // TODO: This flex container is actually not needed here. We should create some shared `<CenteredContainer />` or something.
			className={styles["container"]}
			direction={"column"}
			align={"center"}
		>
			<LoginForm onClick={() => alert("Clicked")} />
		</Flex>
	)
};

export default Login;
