import type { ReactNode, FC } from "react";
import { Flex } from "@/ui/atoms";

export type ListProps = {
	children: ReactNode;
};

export const List: FC<ListProps> = ({ children }) => (
	<Flex style={{ gap: "1rem" }} direction={"column"} fullWidth>
		{children}
	</Flex>
);
