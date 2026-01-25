"use client";

import { type FC } from "react";
import { CenteredOnPage, LoginForm } from "@/ui/molecules";
import { Flex, Paragraph } from "@/ui/atoms";

const Login: FC = () => {
	return (
		<CenteredOnPage>
			<Flex direction={"column"} align={"center"} style={{ gap: "2rem" }}>
				<Paragraph style={{ textAlign: "center"}} fontSize={3}>
					{"Login"}
				</Paragraph>

				<Paragraph style={{ textAlign: "center"}} fontSize={2} variant={"secondary"}>
					{"Wypełnij swoje dane logowania poniżej."}
				</Paragraph>

				<div style={{ width: "75%" }}>
					<LoginForm onClick={() => alert("Clicked")} />
				</div>
			</Flex>
		</CenteredOnPage>
	);
};

export default Login;
