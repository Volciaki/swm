"use client";

import { type FC, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { PageHeader, FormInput } from "@/ui/molecules";
import { Button, Flex, FormError, Input, Paragraph, Separator, Loading } from "@/ui/atoms";
import { apiClient, useAuthData } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";
import type { UseStateSetter } from "@/ui/types";

type LoginFormBody = {
	email: string;
	password: string;
};

export type LoginFormProps = {
	onAuthenticationId: (id: string) => void;
	setPasswordResetFlowShown: UseStateSetter<boolean>;
};

export const LoginForm: FC<LoginFormProps> = ({ onAuthenticationId, setPasswordResetFlowShown }) => {
	const { register, handleSubmit, formState } = useForm<LoginFormBody>({
		mode: "onChange",
		defaultValues: { email: "", password: "" },
	});
	const { refreshAuthData } = useAuthData();
	const [error, setError] = useState<string | undefined>();

	const login = apiClient.identity.login.useMutation({
		onSuccess: async (data) => {
			if ("authenticationToken" in data) {
				await refreshAuthData();
				return;
			}

			if ("authenticationId" in data) onAuthenticationId(data.authenticationId);
		},
		onError: (e) => defaultErrorHandler(e, (errorMessage) => setError(errorMessage)),
	});

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSubmit((formBody) => formSubmitHandler(formBody))();
		}
	};


	const formSubmitHandler = useCallback(
		(data: LoginFormBody) => {
			if (login.isPending) return;

			login.mutate({ email: data.email, passwordRaw: data.password });
		},
		[login]
	);

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "fit-content" }}>
			<PageHeader title={"Login"} description={"Wypełnij swoje dane logowania poniżej."} wrapDescription={false} />

			<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "75%" }}>
				<FormInput error={formState.errors.email}>
					<Input
						type={"email"}
						placeholder={"e-mail"}
						fontSize={1.5}
						onKeyDown={handleKeyDown}
						{...register("email", {
							required: {
								value: true,
								message: "Podanie e-mail'u jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.password} gap={1}>
					<Input
						type={"password"}
						placeholder={"hasło"}
						fontSize={1.5}
						onKeyDown={handleKeyDown}
						{...register("password", {
							required: {
								value: true,
								message: "Podanie hasła jest wymagane.",
							},
						})}
					/>

					<div
						style={{ cursor: "pointer", marginBottom: formState.errors.password && "1rem" }}
						onClick={() => setPasswordResetFlowShown(true)}
					>
						<Paragraph
							variant={"secondary"}
							style={{
								textDecoration: "underline",
								width: "100%",
								textAlign: "right",
							}}
							fontSize={1}
						>
							{"Nie pamiętasz swojego hasła?"}
						</Paragraph>
					</div>
				</FormInput>

				<Separator />

				<Button
					onClick={handleSubmit((formBody) => formSubmitHandler(formBody))}
					style={{ width: "75%" }}
					disabled={login.isPending || !formState.isValid}
				>
					<Paragraph style={{ marginInline: "20px" }} fontSize={1.5}>
						{"Potwierdź"}
					</Paragraph>
				</Button>

				<FormError>{error}</FormError>

				{login.isPending && <Loading />}
			</Flex>
		</Flex>
	);
};
