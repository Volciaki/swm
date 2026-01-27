"use client";

import { type FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/ui/organisms";
import { CenteredOnPage } from "@/ui/molecules";
import { useAuthData } from "@/ui/providers";

const Login: FC = () => {
	const router = useRouter();
	const { authData, isLoadingAuthData } = useAuthData();

	useEffect(() => {
		if (authData !== null) router.replace("/");
	}, [authData, router]);

	if (isLoadingAuthData || authData !== null) return null;

	return (
		<CenteredOnPage>
			<LoginForm />
		</CenteredOnPage>
	);
};

export default Login;
