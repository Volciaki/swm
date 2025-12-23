import { type FC, type ReactNode } from "react";
import { TRPCProvider } from "./trpc";

type ProvidersProps = {
    children: ReactNode;
};

export const Providers: FC<ProvidersProps> = ({ children }) => (
    <TRPCProvider>{children}</TRPCProvider>
);
