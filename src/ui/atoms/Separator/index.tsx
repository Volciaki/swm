import { type FC } from "react";
import { clsx } from "clsx";
import type { CustomStyles } from "@/ui/types";
import styles from "./index.module.scss";

export type SeparatorProps = {
	size?: number;
	direction?: "horizontal" | "vertical";
	variant?: "primary" | "secondary";
} & CustomStyles;

export const Separator: FC<SeparatorProps> = ({
	size,
	style,
	className,
	direction = "horizontal",
	variant = "primary",
}) => (
	<hr
		className={clsx([styles["separator"], styles[direction], styles[variant], className])}
		style={{ borderRadius: "9999px", borderWidth: size ? `${size}px` : undefined, ...style }}
	/>
);
