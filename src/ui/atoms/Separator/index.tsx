import { type FC } from "react";
import styles from "./index.module.scss";

// export type SeparatorProps = {};

export const Separator: FC = () => (
	<hr className={styles["separator"]} />
);
