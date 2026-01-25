import { FC, useState } from "react";
import { Button, Flex, Input, Paragraph } from "@/ui/atoms";

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

			<Button onClick={() => { onClick(email, password) }} variant={"secondary"}>
				<Paragraph>{"Zaloguj się"}</Paragraph>
			</Button>
		</Flex>
	);
}
