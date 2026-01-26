import { Flex, Paragraph } from "@/ui/atoms";
import { FC } from "react";

export type PageHeaderProps = {
	title: string;
	description?: string;
	wrapDescription?: boolean;
};

export const PageHeader: FC<PageHeaderProps> = ({ title, description, wrapDescription = true }) => (
	<Flex direction={"column"} fullWidth>
		<Paragraph style={{ textAlign: "center" }} fontSize={3}>
			{title}
		</Paragraph>

		{description && (
			<Paragraph
				style={{
					textAlign: "center",
					textWrap: wrapDescription ? "wrap" : "nowrap",
				}}
				fontSize={2}
				variant={"secondary"}
			>
				{description}
			</Paragraph>
		)}
	</Flex>
);
