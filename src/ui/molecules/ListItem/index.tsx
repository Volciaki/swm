import type { ReactNode, FC } from "react";
import { clsx } from "clsx";
import { Flex } from "@/ui/atoms";
import styles from "./index.module.scss";

export type ListItemProps = {
	children: ReactNode;
	clickable?: boolean;
};

export const ListItem: FC<ListItemProps> = ({ children, clickable = false }) => (
	<Flex className={clsx([styles["container"], { [styles["clickable"]]: clickable }])} direction={"row"} fullWidth>
		{children}
	</Flex>
);
