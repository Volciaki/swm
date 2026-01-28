"use client";

import { type FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginFlow } from "@/ui/templates";
import { useAuthData } from "@/ui/providers";

const Login: FC = () => {
	const router = useRouter();
	const { authData, isLoadingAuthData } = useAuthData();

	useEffect(() => {
		if (authData !== null) router.replace("/");
	}, [authData, router]);

	if (isLoadingAuthData || authData !== null) return null;

	return <LoginFlow />;
};

export default Login;
