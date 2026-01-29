import { type FC } from "react";
import { clsx } from "clsx";
import styles from "./index.module.scss";

export type SeparatorProps = {
	direction?: "horizontal" | "vertical";
};

export const Separator: FC<SeparatorProps> = ({ direction = "horizontal" }) => (
	<hr className={clsx([styles["separator"], styles[direction]])} />
);
