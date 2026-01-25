import type { ReactNode, FC, CSSProperties } from "react";
import { clsx } from "clsx";
import type { CustomStyles } from "../../types";
import styles from "./index.module.scss";

const ellipsisOverflowStylesheet: CSSProperties = {
	overflow: "hidden",
	textOverflow: "ellipsis",
	textWrap: "nowrap",
};

export type ParagraphProps = {
	children: ReactNode;
	variant?: "primary";
	fontSize?: number;
	ellipsisOverflow?: boolean;
} & CustomStyles;

export const Paragraph: FC<ParagraphProps> = ({
	children,
	variant = "primary",
	fontSize = 2,
	ellipsisOverflow = false,
	className,
	style,
}) => (
	<p
		className={clsx({
			[className as string]: className !== undefined,
			[styles["primary"]]: variant === "primary",
		})}
		style={{
			fontSize: `${fontSize}rem`,
			...(ellipsisOverflow ? ellipsisOverflowStylesheet : {}),
			...style,
		}}
	>
		{children}
	</p>
);
