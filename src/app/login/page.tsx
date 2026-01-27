"use client";

import { type FC, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/ui/organisms";
import { CenteredOnPage } from "@/ui/molecules";
import { Flex, Paragraph } from "@/ui/atoms";
import { apiClient, useAuthData } from "@/ui/providers";

const Login: FC = () => {
	const router = useRouter();
	const { refreshAuthData, authData } = useAuthData();

	const login = apiClient.identity.login.useMutation({
		onSuccess: async (data) => {
			if ("authenticationToken" in data) {
				await refreshAuthData();
				router.push("/");
			}

			if ("authenticationId" in data) {
				router.push(`/2fa?id=${data.authenticationId}`);
			}
		},
	});

	const formSubmitHandler = useCallback(
		(email: string, passwordRaw: string) => {
			if (login.isPending) return;

			login.mutate({ email, passwordRaw });
		},
		[login]
	);

	useEffect(() => {
		if (authData !== null) router.push("/");
	}, [authData, router]);

	return (
		<CenteredOnPage>
			<Flex direction={"column"} align={"center"} style={{ gap: "2rem" }}>
				<LoginForm onSubmit={({ email, password }) => formSubmitHandler(email, password)} />

				{login.isPending && (
					// TODO: replace with some `Loading` component
					<Paragraph>{"ładuję się !!11!!!"}</Paragraph>
				)}
			</Flex>
		</CenteredOnPage>
	);
};

export default Login;
