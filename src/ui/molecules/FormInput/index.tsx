"use client";

import type { ReactNode, FC } from "react";
import type { FieldError } from "react-hook-form";
import { Flex, FormError } from "@/ui/atoms";
import { useMobile } from "@/ui/hooks";

export type FormInputProps = {
	children: ReactNode;
	error?: FieldError;
	gap?: number;
};

export const FormInput: FC<FormInputProps> = ({ children, error, gap: passedGap }) => {
	const { mobile } = useMobile();
	const gap = passedGap ?? (mobile ? 1 : 2);

	return (
		<Flex direction={"column"} style={{ gap: `${gap}rem`, minWidth: 0, flexShrink: 1 }} fullWidth>
			{children}

			<FormError>{error?.message}</FormError>
		</Flex>
	);
};
