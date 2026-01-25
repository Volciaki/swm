import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx"
import styles from "./index.module.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: "primary" | "secondary";
};

export const Button: FC<ButtonProps> = ({
	children,
	variant = "primary",
	className,
	style,
	...props
}) => {
	return (
		<button
			className={clsx([
				styles["button"],
				{ [styles["primary"]]: variant === "primary" },
				{ [styles["secondary"]]: variant === "secondary" },
				{ [className as string]: className !== undefined },
			])}
			style={style}
			{...props}
		>
			{children}
		</button>
	)
};
