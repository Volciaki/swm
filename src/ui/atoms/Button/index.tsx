import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx"
import styles from "./index.module.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: "primary" | "secondary";
	danger?: boolean;
};

export const Button: FC<ButtonProps> = ({
	children,
	variant = "primary",
	danger = false,
	className,
	style,
	...props
}) => {
	return (
		<button
			className={clsx([
				styles["button"],
				styles[variant],
				{ [styles["danger"]]: danger },
				{ [className as string]: className !== undefined },
			])}
			style={style}
			{...props}
		>
			{children}
		</button>
	)
};
