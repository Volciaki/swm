import type { ReactNode, FC } from "react";
import styles from "./index.module.scss";

export type FullHeightProps = {
	children: ReactNode;
};

export const FullHeight: FC<FullHeightProps> = ({ children }) => <div className={styles["container"]}>{children}</div>;
