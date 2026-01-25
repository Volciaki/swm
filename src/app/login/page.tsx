"use client";

import { useCallback, useEffect, useState, type FC } from "react";
import { LoginResponseDTO } from "@/server/modules/identity/application/dto/LoginResponseDTO";
import { CenteredOnPage, LoginForm } from "@/ui/molecules";
import { Flex, Paragraph } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";

const Login: FC = () => {
	const [loginData, setLoginData] = useState<LoginResponseDTO>();
	const login = apiClient.identity.login.useMutation({
		onSuccess: (data) => setLoginData(data),
	});

	const onClickHandler = useCallback((email: string, passwordRaw: string) => {
		if (login.isPending) return;

		login.mutate({ email, passwordRaw });
	}, [login]);

	useEffect(() => {
		console.log("Login data updated!");
		console.log(loginData);
	}, [loginData]);

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
					<LoginForm onClick={onClickHandler} />
				</div>

				{login.isPending && (
					// TODO: replace with some `Loading` component
					<Paragraph>{"ładuję się !!11!!!"}</Paragraph>
				)}
			</Flex>
		</CenteredOnPage>
	);
};

export default Login;
