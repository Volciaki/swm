"use client";

import { FC, useState } from "react";
import { Button, Flex, Input, Paragraph } from "@/ui/atoms";
import { Separator } from "@/ui/atoms/Separator";
import { PageHeader } from "../PageHeader";

export type LoginFormOnClick = {
	onClick: (email: string, password: string) => void;
};

export const LoginForm: FC<LoginFormOnClick> = ({ onClick }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "fit-content" }}>
			<PageHeader title={"Login"} description={"Wypełnij swoje dane logowania poniżej."} wrapDescription={false} />

			<Flex direction={"column"} style={{ gap: "2rem", width: "75%" }}>
				<Input
					style={{ width: "100%" }}
					type="text"
					placeholder="e-mail"
					onChange={(e) => setEmail(e.target.value)}
					fontSize={1.5}
				/>

				<Input
					style={{ width: "100%" }}
					type="password"
					placeholder="Hasło"
					onChange={(e) => setPassword(e.target.value)}
					fontSize={1.5}
				/>

				<Separator />

				<Button onClick={() => { onClick(email, password) }}>
					<Paragraph
						style={{ marginInline: "20px" }}
						fontSize={1.5}
					>
						{"Potwierdź"}
					</Paragraph>
				</Button>

			</Flex>
		</Flex>
	);
}
