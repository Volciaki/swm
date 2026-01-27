"use client";

import type { FC, ReactNode } from "react";
import { useAuthData } from "@/ui/providers";
import { Flex } from "@/ui/atoms";
import { Loading } from "@/ui/atoms/Loading";
import { LoginForm } from "../LoginForm";

type AuthDataStatus = "loading" | "unauthorized" | "authorized";

export type ProtectedProps = {
	children: ReactNode;
};

export const Protected: FC<ProtectedProps> = ({ children }) => {
	const { authData, isLoadingAuthData } = useAuthData();
	const authDataStatus: AuthDataStatus = isLoadingAuthData ? "loading" : !authData ? "unauthorized" : "authorized";

	return (
		<Flex direction={"column"} align={"center"} fullWidth>
			{authDataStatus === "loading" && <Loading />}

			{authDataStatus === "unauthorized" && <LoginForm />}

			{authDataStatus === "authorized" && children}
		</Flex>
	);
};
