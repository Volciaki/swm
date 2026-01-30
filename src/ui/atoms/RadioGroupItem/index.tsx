import { type FC, type ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./index.module.scss";

export type RadioGroupItemProps = {
	children: ReactNode;
	value: string;
	formName?: string;
	selectedValue?: string;
	onChange?: (value: string) => void;
	size?: number;
};

export const RadioGroupItem: FC<RadioGroupItemProps> = ({
	children,
	formName,
	value,
	selectedValue,
	onChange,
	size = 1,
}) => {
	if (!formName) {
		console.error("RadioGroupItem requires the 'formName' prop to be set either directly, or via 'RadioGroup' parent.");
		return null;
	}

	const checked = selectedValue === value;

	return (
		<label className={styles["container"]}>
			<span className={clsx([styles["indicator"], { [styles["checked"]]: checked }])} style={{ width: `${size}rem` }} />

			<input
				type={"radio"}
				onChange={() => onChange?.(value)}
				name={formName}
				value={value}
				checked={checked}
				className={styles["radio"]}
			/>

			{children}
		</label>
	);
};
