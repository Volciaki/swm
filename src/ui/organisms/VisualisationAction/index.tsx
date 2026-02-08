"use client";

import type { ReactNode, FC } from "react";
import { Flex, Paragraph } from "@/ui/atoms";
import { useMobile } from "@/ui/hooks";

export type VisualisationActionProps = {
	title: string;
	children: ReactNode;
};

export const VisualisationAction: FC<VisualisationActionProps> = ({ children, title }) => {
	const { mobile } = useMobile();

	return (
		<Flex direction={"column"} justify={"center"} align={"center"} style={{ gap: "1rem" }} fullWidth>
			<Paragraph fontSize={mobile ? 1.5 : 1.75} style={{ textAlign: "center" }}>
				{title}
			</Paragraph>

			{children}
		</Flex>
	);
};
