import { type InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import styles from "./index.module.scss";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	padding?: number;
	fontSize?: number;
	danger?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ padding = 10, fontSize = 2, danger = false, children, style, ...props }, ref) => (
		<input
			style={{
				fontSize: `${fontSize}rem`,
				padding: `${padding}px`,
				...style,
			}}
			className={clsx([
				styles["input"],
				{ [styles["danger"]]: danger },
			])}
			ref={ref}
			{...props}
		>
			{children}
		</input>
	)
);

Input.displayName = "Input";
