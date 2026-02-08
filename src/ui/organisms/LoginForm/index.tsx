"use client";

import { type FC, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { PageHeader, FormInput } from "@/ui/molecules";
import { Button, Flex, FormError, Input, Paragraph, Separator, Loading } from "@/ui/atoms";
import { apiClient, useAuthData } from "@/ui/providers";
import { useMobile } from "@/ui/hooks";
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
	const { mobile } = useMobile();

	const gap = mobile ? "1rem" : "2rem";

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

	const formSubmitHandler = useCallback(
		(data: LoginFormBody) => {
			if (login.isPending) return;

			login.mutate({ email: data.email, passwordRaw: data.password });
		},
		[login]
	);

	return (
		<form onSubmit={() => handleSubmit(formSubmitHandler)}>
			<Flex direction={"column"} align={"center"} style={{ gap, width: "fit-content" }}>
				<PageHeader
					title={"Login"}
					description={"Wypełnij swoje dane logowania poniżej."}
					wrapDescription={mobile ? true : false}
				/>

				<Flex direction={"column"} align={"center"} style={{ gap, width: "75%" }}>
					<FormInput error={formState.errors.email}>
						<Input
							type={"email"}
							placeholder={"e-mail"}
							fontSize={mobile ? 1.25 : 1.5}
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
							fontSize={mobile ? 1.25 : 1.5}
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
									textAlign: mobile ? "center" : "right",
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
						<Paragraph style={{ marginInline: mobile ? "10px" : "20px" }} fontSize={mobile ? 1.25 : 1.5}>
							{"Potwierdź"}
						</Paragraph>
					</Button>

					<FormError>{error}</FormError>

					{login.isPending && <Loading />}
				</Flex>
			</Flex>
		</form>
	);
};
