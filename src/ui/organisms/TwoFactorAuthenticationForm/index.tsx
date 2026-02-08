"use client";

import { useCallback, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { BackButton, FormInput, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, Input, Loading, Paragraph, Separator } from "@/ui/atoms";
import { useAuthData, apiClient } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";
import { useMobile } from "@/ui/hooks";

type TwoFactorAuthenticationFormBody = {
	code: string;
};

export type TwoFactorAuthenticationFormProps = {
	authenticationId: string;
	hideSelf: () => void;
};

export const TwoFactorAuthenticationForm: FC<TwoFactorAuthenticationFormProps> = ({ authenticationId, hideSelf }) => {
	const { refreshAuthData } = useAuthData();
	const { register, handleSubmit, formState } = useForm<TwoFactorAuthenticationFormBody>({
		mode: "onChange",
		defaultValues: { code: "" },
	});
	const [error, setError] = useState("");
	const { mobile } = useMobile();

	const gap = mobile ? "1rem" : "2rem";

	const twoFactorAuthentication = apiClient.identity.twoFactorAuthentication.useMutation({
		onSuccess: async (data) => refreshAuthData(),
		onError: (e) => defaultErrorHandler(e, (errorMessage) => setError(errorMessage)),
	});

	const formSubmitHandler = useCallback(
		(data: TwoFactorAuthenticationFormBody) => {
			if (twoFactorAuthentication.isPending) return;

			twoFactorAuthentication.mutate({ authenticationId: authenticationId, value: data.code });
		},
		[twoFactorAuthentication, authenticationId]
	);

	return (
		<Flex direction={"column"} align={"center"} style={{ gap, width: "fit-content" }}>
			<div style={{ alignSelf: "start" }}>
				<BackButton enableDefaultOnClick={false} onClick={() => hideSelf()} />
			</div>

			<PageHeader
				title={"Dwuetapowa weryfikacja"}
				description={"Wpisz kod, który został wysłany na Twój e-mail."}
				wrapDescription={mobile ? true : false}
			/>

			<Flex direction={"column"} align={"center"} style={{ gap, width: "75%" }}>
				<FormInput error={formState.errors.code}>
					<Input
						type="text"
						placeholder="kod weryfikacyjny"
						fontSize={mobile ? 1.25 : 1.5}
						{...register("code", {
							required: {
								value: true,
								message: "Podanie kodu jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<Separator />

				<Button
					onClick={handleSubmit((formBody) => formSubmitHandler(formBody))}
					style={{ width: "75%" }}
					disabled={twoFactorAuthentication.isPending || !formState.isValid}
				>
					<Paragraph style={{ marginInline: "20px" }} fontSize={mobile ? 1.25 : 1.5}>
						{"Potwierdź"}
					</Paragraph>
				</Button>

				<FormError>{error}</FormError>

				{twoFactorAuthentication.isPending && <Loading />}
			</Flex>
		</Flex>
	);
};
