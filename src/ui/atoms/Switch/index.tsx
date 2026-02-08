import { type FC } from "react";
import { clsx } from "clsx";
import type { UseStateSetter } from "@/ui/types";
import styles from "./index.module.scss";

const SWITCH_WIDTH_TO_SLIDER_RATIO = 3;

export type SwitchProps = {
	checked: boolean;
	setChecked: UseStateSetter<boolean>;
	size?: number;
	disabled?: boolean;
};

export const Switch: FC<SwitchProps> = ({ checked, setChecked, size = 1.5, disabled }) => (
	<label
		className={clsx([styles["container"], { [styles["checked"]]: checked }, { [styles["disabled"]]: disabled }])}
		style={{
			minWidth: `${size * SWITCH_WIDTH_TO_SLIDER_RATIO}rem`,
			height: `${size}rem`,
			// Yes this is dumb. But simply putting `calc(size * / 2)` results in some pixel fractioning.
			borderRadius: "9999px",
		}}
	>
		<input
			type={"checkbox"}
			checked={checked}
			disabled={disabled}
			onChange={(e) => setChecked(e.target.checked)}
			className={styles["checkbox"]}
		/>
		<span
			className={clsx([styles["slider"], { [styles["checked"]]: checked }, { [styles["disabled"]]: disabled }])}
			style={{ width: `${size}rem`, height: `${size}rem` }}
		/>
	</label>
);
