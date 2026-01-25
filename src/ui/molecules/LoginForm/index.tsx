import { FC, useState } from "react";
import { Button, Flex, Input, Paragraph } from "@/ui/atoms";
import { Separator } from "@/ui/atoms/Separator";

export type LoginFormOnClick = {
	onClick: (email: string, password: string) => void;
};

export const LoginForm: FC<LoginFormOnClick> = ({ onClick }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem" }}>
			<Input
				type="text"
				placeholder="e-mail"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<Input
				type="password"
				placeholder="Hasło"
				onChange={(e) => setPassword(e.target.value)}
			/>

			<Separator />

			<Button onClick={() => { onClick(email, password) }}>
				<Paragraph>{"Potwierdź"}</Paragraph>
			</Button>
		</Flex>
	);
}
