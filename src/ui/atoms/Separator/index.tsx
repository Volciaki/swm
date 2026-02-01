import { type FC } from "react";
import { clsx } from "clsx";
import type { CustomStyles } from "@/ui/types";
import styles from "./index.module.scss";

export type SeparatorProps = {
	size?: number;
	direction?: "horizontal" | "vertical";
} & CustomStyles;

export const Separator: FC<SeparatorProps> = ({ size, style, className, direction = "horizontal" }) => (
	<hr
		className={clsx([styles["separator"], styles[direction], className])}
		style={{ borderRadius: "9999px", borderWidth: size ? `${size}px` : undefined, ...style }}
	/>
);
