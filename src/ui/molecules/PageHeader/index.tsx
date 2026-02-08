"use client";

import type { FC } from "react";
import { Flex, Paragraph } from "@/ui/atoms";
import { useMobile } from "@/ui/hooks";

export type PageHeaderProps = {
	title: string;
	description?: string;
	wrapDescription?: boolean;
};

export const PageHeader: FC<PageHeaderProps> = ({ title, description, wrapDescription = true }) => {
	const { mobile } = useMobile();

	return (
		<Flex direction={"column"} style={{ gap: "1rem" }} fullWidth>
			<Paragraph style={{ textAlign: "center" }} fontSize={mobile ? 2 : 3}>
				{title}
			</Paragraph>

			{description && (
				<Paragraph
					style={{
						textAlign: "center",
						textWrap: wrapDescription ? "wrap" : "nowrap",
					}}
					fontSize={mobile ? 1.25 : 1.5}
					variant={"secondary"}
				>
					{description}
				</Paragraph>
			)}
		</Flex>
	);
};
