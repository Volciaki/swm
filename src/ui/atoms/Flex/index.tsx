import type { FC, ReactNode } from "react";
import { clsx } from "clsx";
import { type CustomStyles } from "../../types";
import styles from "./index.module.scss";

type Alignment = "flex-start" | "center" | "flex-end";

export type FlexProps = {
	children?: ReactNode;
	direction?: "column" | "column-reverse" | "row" | "row-reverse";
	align?: Alignment;
	justify?: Alignment | "space-between" | "space-around";
	gap?: number;
	fullWidth?: boolean;
} & CustomStyles;

export const Flex: FC<FlexProps> = ({
	children,
	direction,
	align,
	justify,
	gap,
	fullWidth,
	style,
	className,
}) => {
	const styleSheet = { ...style };
	if (direction) styleSheet.flexDirection = direction;
	if (align) styleSheet.alignItems = align;
	if (justify) styleSheet.justifyContent = justify;
	if (fullWidth) styleSheet.width = "100%";
	styleSheet.gap = styleSheet.gap ?? `${gap ?? 0}px`;

	return (
		<div
			className={clsx([styles.flex], {
				[className as string]: className !== undefined,
			})}
			style={styleSheet}
		>
			{children}
		</div>
	);
};
