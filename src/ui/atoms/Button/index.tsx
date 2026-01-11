import { FC, ReactNode } from "react";
import clsx from "clsx"

import styles from  "./index.module.scss";
import { navbarRoutes } from "@/utils/routes";

export type ButtonProps = {
  variant: "primary" | "secondary",
  children: ReactNode,
}

export const Button: FC<ButtonProps> = ({ variant, children }) => {
	return (
		<a href={navbarRoutes[0].path} className={clsx([styles["button"], styles[variant]])}>{children}</a>
	)
};