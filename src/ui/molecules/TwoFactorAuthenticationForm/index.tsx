import { FC } from "react";
import { useState } from "react";
import { Button, Flex, Input, Paragraph } from "@/ui/atoms";

export type TwoFactorAuthenticationFormProps = {
    onSubmit: (value: string) => void;
};

export const TwoFactorAuthenticationForm: FC<TwoFactorAuthenticationFormProps> = ({ onSubmit }) => {
	const [value, setValue] = useState("");

	return(
		<Flex direction={"column"} align={"center"}>
			<Input
				type="text"
				placeholder="000000"
				onChange={(e) => setValue(e.target.value)}
			/>

			<Button onClick={() => onSubmit(value)}>
				<Paragraph>{"Submit"}</Paragraph>
			</Button>
		</Flex>
	);
}
