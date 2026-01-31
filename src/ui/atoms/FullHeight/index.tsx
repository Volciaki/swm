import type { ReactNode, FC } from "react";
import { clsx } from "clsx";
import type { CustomStyles } from "@/ui/types";
import styles from "./index.module.scss";

export type FullHeightProps = {
	children: ReactNode;
} & CustomStyles;

export const FullHeight: FC<FullHeightProps> = ({ children, style, className }) => (
	<div className={clsx([styles["container"], className])} style={style}>
		{children}
	</div>
);
