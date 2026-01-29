"use client";

import type { FC, ReactNode } from "react";
import { useAuthData } from "@/ui/providers";
import { LoginFlow } from "@/ui/templates";
import { Flex, Loading } from "@/ui/atoms";

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

			{authDataStatus === "unauthorized" && <LoginFlow />}

			{authDataStatus === "authorized" && children}
		</Flex>
	);
};
