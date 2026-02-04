import type { ReactNode, FC } from "react";
import { Flex, Separator } from "@/ui/atoms";
import styles from "./index.module.scss";

export type CardProps = {
	children: ReactNode;
	additionalActions?: ReactNode;
};

export const Card: FC<CardProps> = ({ children, additionalActions }) => (
	<Flex direction={"column"} style={{ gap: "1rem" }}>
		<div className={styles["data-container"]}>
			<Flex direction={"column"} style={{ gap: "0.5rem" }} className={styles["data-wrapper"]}>
				{children}
			</Flex>
		</div>

		{additionalActions && (
			<>
				<Separator />

				<Flex direction={"row"} justify={"space-around"} align={"center"}>
					{additionalActions}
				</Flex>
			</>
		)}
	</Flex>
);
