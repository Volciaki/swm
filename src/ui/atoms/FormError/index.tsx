import { type FC } from "react";
import { Paragraph } from "../Paragraph";

export type FormErrorProps = {
	children?: string;
};

export const FormError: FC<FormErrorProps> = ({ children }) => {
	if (!children) return null;

	return (
		<Paragraph variant={"danger"} fontSize={1.25} style={{ textAlign: "center" }}>
			{children}
		</Paragraph>
	);
};
