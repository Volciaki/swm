import Link from "next/link";
import { type ReactNode, type FC } from "react";
import { type CustomStyles } from "@/ui/types";
import clsx from "clsx";
import styles from "./index.module.scss";

export type AnchorProps = {
	href: string;
	newTab?: boolean;
	prefetch?: boolean;
	children?: ReactNode;
	darkenOnHover?: boolean;
	draggable?: boolean;
} & CustomStyles;

export const Anchor: FC<AnchorProps> = ({ newTab, children, className, darkenOnHover, style, ...props }) => (
	<Link
		target={newTab ? "_blank" : undefined}
		rel={newTab ? "noreferrer noopener" : undefined}
		className={clsx(
			[className],
			[styles.anchor],
			{ [styles["darken-on-hover"]]: darkenOnHover }
		)}
		style={style}
		{...props}
	>
		{children}
	</Link>
);
