import type { ReactNode, FC } from "react";
import { clsx } from "clsx";
import { Flex } from "@/ui/atoms";
import type { CustomStyles } from "@/ui/types";
import styles from "./index.module.scss";

export type BlockProps = {
	children: ReactNode;
	variant?: "primary" | "secondary";
} & CustomStyles;

export const Block: FC<BlockProps> = ({ children, className, style, variant = "primary" }) => (
	<Flex
		className={clsx([styles["container"], styles[variant], { [className as string]: className }])}
		style={style}
		direction={"column"}
	>
		{children}
	</Flex>
);
