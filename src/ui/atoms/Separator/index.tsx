import { type FC } from "react";
import { clsx } from "clsx";
import styles from "./index.module.scss";

export type SeparatorProps = {
	size?: number;
	direction?: "horizontal" | "vertical";
};

export const Separator: FC<SeparatorProps> = ({ size, direction = "horizontal" }) => (
	<hr className={clsx([styles["separator"], styles[direction]])} style={size ? { borderWidth: `${size}px` } : {}} />
);
