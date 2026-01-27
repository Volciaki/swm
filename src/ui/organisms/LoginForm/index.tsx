"use client";

import type { FC } from "react";
import { useForm } from "react-hook-form";
import { PageHeader, FormInput } from "@/ui/molecules";
import { Button, Flex, FormError, Input, Paragraph, Separator } from "@/ui/atoms";

type LoginFormBody = {
	email: string;
	password: string;
};

export type LoginFormProps = {
	onSubmit: (value: LoginFormBody) => void;
	error?: string;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, error }) => {
	const { register, handleSubmit, formState } = useForm<LoginFormBody>({
		mode: "onChange",
		defaultValues: {},
	});

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "fit-content" }}>
			<PageHeader title={"Login"} description={"Wypełnij swoje dane logowania poniżej."} wrapDescription={false} />

			<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "75%" }}>
				<FormInput error={formState.errors.email}>
					<Input
						type="text"
						placeholder="e-mail"
						fontSize={1.5}
						{...register("email", {
							required: {
								value: true,
								message: "Podanie e-mail'u jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.password}>
					<Input
						type="password"
						placeholder="hasło"
						fontSize={1.5}
						{...register("password", {
							required: {
								value: true,
								message: "Podanie hasła jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<Separator />

				<Button onClick={handleSubmit((formBody) => onSubmit(formBody))} style={{ width: "75%" }}>
					<Paragraph style={{ marginInline: "20px" }} fontSize={1.5}>
						{"Potwierdź"}
					</Paragraph>
				</Button>

				<FormError>{error}</FormError>
			</Flex>
		</Flex>
	);
};
