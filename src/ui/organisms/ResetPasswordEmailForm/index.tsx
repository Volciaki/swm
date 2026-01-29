"use client";

import { useCallback, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import type { UseStateSetter } from "@/ui/types";
import { apiClient } from "@/ui/providers";
import { Button, Flex, FormError, Input, Loading, Paragraph, Separator } from "@/ui/atoms";
import { FormInput, PageHeader } from "@/ui/molecules";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

type ResetPasswordEmailFormBody = {
	email: string;
};

export type ResetPasswordEmailFormProps = {
	setEmail: UseStateSetter<string | undefined>;
	setAuthenticationId: UseStateSetter<string | undefined>;
};

export const ResetPasswordEmailForm: FC<ResetPasswordEmailFormProps> = ({ setEmail, setAuthenticationId }) => {
	const [error, setError] = useState<string | undefined>();
	const [lastSubmitedEmail, setLastSubmitedEmail] = useState<string | undefined>();
	// TODO: add an endpoint to get user by email.
	const users = apiClient.identity.listUsers.useQuery();
	const requestPasswordReset = apiClient.identity.requestPasswordReset.useMutation({
		onSuccess: (data) => {
			setEmail(lastSubmitedEmail);
			setAuthenticationId(data.authenticationId);
		},
		onError: (e) => {
			if (!e.data?.metadata) return;

			const errorMessage = getPolishErrorMessageByMetadata(e.data.metadata);
			setError(errorMessage);
		},
	});
	const { formState, register, handleSubmit } = useForm<ResetPasswordEmailFormBody>({
		mode: "onChange",
		defaultValues: { email: "" },
	});

	const formSubmitHandler = useCallback(
		(data: ResetPasswordEmailFormBody) => {
			if (!users.data) return;

			const user = users.data.find((user) => user.email === data.email);

			if (!user) {
				setError(`Użytkownik z adresem e-mail ${data.email} nie istnieje!`);
				return;
			}

			setLastSubmitedEmail(user.email);
			requestPasswordReset.mutate({ userId: user.id });
		},
		[users, requestPasswordReset]
	);

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "fit-content" }}>
			<PageHeader
				title={"Resetowanie hasła"}
				description={"Podaj e-mail powiązany z twoim kontem."}
				wrapDescription={false}
			/>

			{users.isLoading ? (
				<Loading />
			) : (
				<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "75%" }}>
					<FormInput error={formState.errors.email}>
						<Input
							type={"email"}
							placeholder={"e-mail"}
							fontSize={1.5}
							{...register("email", {
								required: {
									value: true,
									message: "Podanie e-mail'u jest wymagane.",
								},
							})}
						/>
					</FormInput>

					<Separator />

					<Button
						onClick={handleSubmit((formBody) => formSubmitHandler(formBody))}
						style={{ width: "75%" }}
						disabled={requestPasswordReset.isPending}
					>
						<Paragraph style={{ marginInline: "20px" }} fontSize={1.5}>
							{"Potwierdź"}
						</Paragraph>
					</Button>

					<FormError>{error}</FormError>

					{requestPasswordReset.isPending && <Loading />}
				</Flex>
			)}
		</Flex>
	);
};
