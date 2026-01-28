"use client";

import { useCallback, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { FormInput, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, Input, Loading, Paragraph, Separator } from "@/ui/atoms";
import { useAuthData, apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

type TwoFactorAuthenticationFormBody = {
	code: string;
};

export type TwoFactorAuthenticationFormProps = {
	authenticationId: string;
};

export const TwoFactorAuthenticationForm: FC<TwoFactorAuthenticationFormProps> = ({ authenticationId }) => {
	const { refreshAuthData } = useAuthData();
	const { register, handleSubmit, formState } = useForm<TwoFactorAuthenticationFormBody>({
		mode: "onChange",
		defaultValues: { code: "" },
	});
	const [error, setError] = useState("");

	const twoFactorAuthentication = apiClient.identity.twoFactorAuthentication.useMutation({
		onSuccess: async (data) => refreshAuthData(),
		onError: async (error) => {
			if (!error?.data) return;

			const errorMessage = getPolishErrorMessageByMetadata(error.data.metadata);
			setError(errorMessage);
		},
	});

	const formSubmitHandler = useCallback(
		(data: TwoFactorAuthenticationFormBody) => {
			if (twoFactorAuthentication.isPending) return;

			twoFactorAuthentication.mutate({ authenticationId: authenticationId, value: data.code });
		},
		[twoFactorAuthentication, authenticationId]
	);

	return (
		<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "fit-content" }}>
			<PageHeader
				title={"Dwuetapowa weryfikacja"}
				description={"Wpisz kod, który został wysłany na Twój e-mail."}
				wrapDescription={false}
			/>

			<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "75%" }}>
				<FormInput error={formState.errors.code}>
					<Input
						type="text"
						placeholder="kod weryfikacyjny"
						fontSize={1.5}
						{...register("code", {
							required: {
								value: true,
								message: "Podanie kodu jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<Separator />

				<Button onClick={handleSubmit((formBody) => formSubmitHandler(formBody))} style={{ width: "75%" }}>
					<Paragraph style={{ marginInline: "20px" }} fontSize={1.5}>
						{"Potwierdź"}
					</Paragraph>
				</Button>

				<FormError>{error}</FormError>

				{twoFactorAuthentication.isPending && <Loading />}
			</Flex>
		</Flex>
	);
};
