import { type InputHTMLAttributes, forwardRef } from "react";
import styles from "./index.module.scss";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	padding?: number;
	fontSize?: number;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ padding = 10, fontSize = 2, children, style, ...props }, ref) => (
		<input
			style={{
				fontSize: `${fontSize}rem`,
				padding: `${padding}px`,
				...style,
			}}
			className={styles["input"]}
			ref={ref}
			{...props}
		>
			{children}
		</input>
	)
);

Input.displayName = "Input";
