"use client";

import { type FC } from "react";
import { useMobile } from "@/ui/hooks";
import { Paragraph } from "../Paragraph";

export type FormErrorProps = {
	children?: string;
};

export const FormError: FC<FormErrorProps> = ({ children }) => {
	const { mobile } = useMobile();

	if (!children) return null;

	return (
		<Paragraph variant={"danger"} fontSize={mobile ? 1 : 1.25} style={{ textAlign: "center", wordBreak: "break-word" }}>
			{children}
		</Paragraph>
	);
};
