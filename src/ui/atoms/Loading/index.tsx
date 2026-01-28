import { type FC } from "react";
import styles from "./index.module.scss";

export type LoadingProps = {
	size?: number;
};

export const Loading: FC<LoadingProps> = ({ size = 48 }) => (
	<div className={styles["wrapper"]} style={{ width: `${size}px`, height: `${size}px` }}>
		<div className={styles["background"]} style={{ borderWidth: `${size * 0.1}px` }} />
		<div className={styles["primary"]} style={{ borderWidth: `${size * 0.1}px` }} />
	</div>
);
