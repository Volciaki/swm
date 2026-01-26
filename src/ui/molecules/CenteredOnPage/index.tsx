import { FC, ReactNode } from "react";
import { Flex } from "@/ui/atoms";
import styles from "./index.module.scss";

export type CenteredOnPageProps = {
	children?: ReactNode;
};

export const CenteredOnPage: FC<CenteredOnPageProps> = ({ children }) => (
	<Flex direction={"column"} align={"center"} justify={"center"} className={styles["container"]} fullWidth>
		{children}
	</Flex>
);
