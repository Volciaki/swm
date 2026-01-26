"use client";

import { type ReactNode, type FC, useState } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server/trpc/app";
import { makeQueryClient } from "@/server/trpc/query-client";
import { environment } from "@/server/environment";

export const apiClient = createTRPCReact<AppRouter>();

let queryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = (): QueryClient => {
	// Server: always create a new QueryClient.
	if (typeof window === "undefined") return makeQueryClient();

	// Browser: keep the current one if it exists.
	if (!queryClientSingleton) queryClientSingleton = makeQueryClient();
	return queryClientSingleton;
};

const getBaseUrl = () => {
	// Server: localhost with app's port.
	if (typeof window === "undefined") return `http://localhost:${environment.port ?? 3000}`;
	// Browser: tab URL.
	return window.location.origin;
};

type TRPCProviderProps = {
	children: Readonly<ReactNode>;
};

export const TRPCProvider: FC<TRPCProviderProps> = ({ children }) => {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		apiClient.createClient({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
					fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
				}),
			],
		})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<apiClient.Provider client={trpcClient} queryClient={queryClient}>
				{children}
			</apiClient.Provider>
		</QueryClientProvider>
	);
};
