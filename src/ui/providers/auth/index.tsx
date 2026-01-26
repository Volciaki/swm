"use client";

import { type FC, type ReactNode, createContext, useContext } from "react";
import type { UserDTO } from "@/server/utils";
import { apiClient } from "../trpc";

type AuthDataValue = UserDTO;

type AuthDataContextValue = {
	authData: AuthDataValue | null;
	refreshAuthData: () => Promise<void>;
};

const AuthDataContext = createContext<AuthDataContextValue | undefined>(undefined);

type AuthDataProviderProps = {
	children: ReactNode;
};

export const AuthDataProvider: FC<AuthDataProviderProps> = ({ children }) => {
	const getSession = apiClient.identity.getSession.useQuery(undefined);

	return (
		<AuthDataContext.Provider
			value={{
				authData: getSession.data?.user ?? null,
				refreshAuthData: async () => {
					await getSession.refetch();
				},
			}}
		>
			{children}
		</AuthDataContext.Provider>
	);
};

export const useAuthData = () => {
	const context = useContext(AuthDataContext);

	if (!context) {
		throw new Error("`useAuthData` must be used within an `AuthDataProvider`!");
	}

	return context;
};
