"use client";

import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import type { UseStateSetter } from "@/ui/types";
import { apiClient } from "@/ui/providers";
import { FormInput, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, Input, Loading, Paragraph, Separator } from "@/ui/atoms";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

type ResetPasswordEmailFormBody = {
	email: string;
};

export type ResetPasswordEmailFormProps = {
	setEmail: UseStateSetter<string | undefined>;
	setAuthenticationId: UseStateSetter<string | undefined>;
};

export const ResetPasswordEmailForm: FC<ResetPasswordEmailFormProps> = ({ setEmail, setAuthenticationId }) => {
	const [lastEmail, setLastEmail] = useState<string | undefined>();
	const getUserByEmail = apiClient.identity.getUserByEmail.useQuery(
		{ email: lastEmail ?? "" },
		{
			enabled: lastEmail !== undefined,
		}
	);
	const requestPasswordReset = apiClient.identity.requestPasswordReset.useMutation({
		onSuccess: (data) => {
			setEmail(getUserByEmail.data?.email);
			setAuthenticationId(data.authenticationId);
		},
	});
	const { formState, register, handleSubmit } = useForm<ResetPasswordEmailFormBody>({
		mode: "onChange",
		defaultValues: { email: "" },
	});
	const loading = getUserByEmail.isLoading || requestPasswordReset.isPending;
	const getUserByEmailError = useMemo(() => {
		if (!getUserByEmail.error?.data?.metadata) return undefined;

		return getPolishErrorMessageByMetadata(getUserByEmail.error?.data?.metadata);
	}, [getUserByEmail.error]);
	const requestPasswordResetError = useMemo(() => {
		if (!requestPasswordReset.error?.data?.metadata) return undefined;

		return getPolishErrorMessageByMetadata(requestPasswordReset.error?.data?.metadata);
	}, [requestPasswordReset.error]);
	const error = getUserByEmailError ?? requestPasswordResetError;

	const formSubmitHandler = useCallback(async (data: ResetPasswordEmailFormBody) => {
		setLastEmail(data.email);
	}, []);

	useEffect(() => {
		if (!getUserByEmail.data) return;

		requestPasswordReset.mutate({ userId: getUserByEmail.data.id });
	}, [getUserByEmail.data, requestPasswordReset.mutate]);

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "fit-content" }}>
			<PageHeader
				title={"Resetowanie hasła"}
				description={"Podaj e-mail powiązany z twoim kontem."}
				wrapDescription={false}
			/>

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
					disabled={loading || !formState.isValid}
				>
					<Paragraph style={{ marginInline: "20px" }} fontSize={1.5}>
						{"Potwierdź"}
					</Paragraph>
				</Button>

				{error && <FormError>{error}</FormError>}

				{loading && <Loading />}
			</Flex>
		</Flex>
	);
};
