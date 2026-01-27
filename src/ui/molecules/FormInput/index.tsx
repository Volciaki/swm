import type { ReactNode, FC } from "react";
import type { FieldError } from "react-hook-form";
import { Flex, FormError } from "@/ui/atoms";

export type FormInputProps = {
	children: ReactNode;
	error?: FieldError;
};

export const FormInput: FC<FormInputProps> = ({ children, error }) => (
	<Flex direction={"column"} style={{ gap: "2rem" }} fullWidth>
		{children}

		<FormError>{error?.message}</FormError>
	</Flex>
);
