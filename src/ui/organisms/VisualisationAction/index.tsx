import type { ReactNode, FC } from "react";
import { Flex, Paragraph } from "@/ui/atoms";

export type VisualisationActionProps = {
	title: string;
	children: ReactNode;
};

export const VisualisationAction: FC<VisualisationActionProps> = ({ children, title }) => (
	<Flex direction={"column"} justify={"center"} align={"center"} style={{ gap: "1rem" }} fullWidth>
		<Paragraph fontSize={1.75} style={{ textAlign: "center" }}>
			{title}
		</Paragraph>

		{children}
	</Flex>
);
