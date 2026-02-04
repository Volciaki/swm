"use client";

import { useCallback, useMemo, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { apiClient } from "@/ui/providers";
import { BackButton, FormInput, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, Input, Loading, Paragraph, Separator } from "@/ui/atoms";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

type ResetPasswordEmailFormBody = {
	email: string;
};

export type ResetPasswordEmailFormProps = {
	onSuccess: (email: string, authenticationId: string) => void;
	hideResetPasswordForm: () => void;
};

export const ResetPasswordEmailForm: FC<ResetPasswordEmailFormProps> = ({ onSuccess, hideResetPasswordForm }) => {
	const [lastEmail, setLastEmail] = useState<string | undefined>();
	const apiUtils = apiClient.useUtils();
	const getUserByEmail = apiClient.identity.getUserByEmail.useQuery(
		{ email: lastEmail ?? "" },
		{ enabled: lastEmail !== undefined }
	);
	const requestPasswordReset = apiClient.identity.requestPasswordReset.useMutation({
		onSuccess: (data) => {
			const email = getUserByEmail.data?.email;
			const authenticationId = data.authenticationId;

			if (!email) return;

			apiUtils.identity.getUserByEmail.reset();
			onSuccess(email, authenticationId);
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

	const formSubmitHandler = useCallback(
		async (data: ResetPasswordEmailFormBody) => {
			setLastEmail(data.email);
			const user = await getUserByEmail.refetch();

			if (!user.data) return;

			requestPasswordReset.mutate({ userId: user.data.id });
		},
		[getUserByEmail, requestPasswordReset]
	);

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "fit-content" }}>
			<div style={{ alignSelf: "start" }}>
				<BackButton enableDefaultOnClick={false} onClick={() => hideResetPasswordForm()} />
			</div>

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
