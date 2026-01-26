import { type FC, type ReactNode } from "react";
import { TRPCProvider } from "./trpc";
import { AuthDataProvider } from "./auth";

type ProvidersProps = {
    children: ReactNode;
};

export const Providers: FC<ProvidersProps> = ({ children }) => (
	<TRPCProvider>
		<AuthDataProvider>
			{children}
		</AuthDataProvider>
	</TRPCProvider>
);
