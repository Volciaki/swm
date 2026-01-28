import type { FC } from "react";
import { Flex, Paragraph } from "@/ui/atoms";

export type PageHeaderProps = {
	title: string;
	description?: string;
	wrapDescription?: boolean;
};

export const PageHeader: FC<PageHeaderProps> = ({ title, description, wrapDescription = true }) => (
	<Flex direction={"column"} style={{ gap: "1rem" }} fullWidth>
		<Paragraph style={{ textAlign: "center" }} fontSize={3}>
			{title}
		</Paragraph>

		{description && (
			<Paragraph
				style={{
					textAlign: "center",
					textWrap: wrapDescription ? "wrap" : "nowrap",
				}}
				fontSize={1.5}
				variant={"secondary"}
			>
				{description}
			</Paragraph>
		)}
	</Flex>
);
