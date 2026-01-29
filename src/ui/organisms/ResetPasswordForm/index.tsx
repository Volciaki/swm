"use client";

import { useCallback, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { Button, Flex, FormError, Input, Loading, Paragraph, Separator } from "@/ui/atoms";
import { FormInput, PageHeader } from "@/ui/molecules";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler, getPolishErrorMessageByErrorObject } from "@/ui/utils";
import styles from "./index.module.scss";

type PasswordResetFormBody = {
	authenticationValue: string;
	newPassword: string;
	newPasswordRepeated: string;
};

export type PasswordResetFormProps = {
	authenticationId: string;
	onPasswordReset: () => void;
};

export const PasswordResetForm: FC<PasswordResetFormProps> = ({ authenticationId, onPasswordReset }) => {
	const { formState, register, handleSubmit } = useForm<PasswordResetFormBody>({
		mode: "onChange",
	});
	const [error, setError] = useState<string | undefined>();
	const passwordReset = apiClient.identity.passwordReset.useMutation({
		onSuccess: () => onPasswordReset(),
		onError: (e) => defaultErrorHandler(e, (errorMessage) => setError(errorMessage)),
	});

	const formSubmitHandler = useCallback(
		(data: PasswordResetFormBody) => {
			if (data.newPassword !== data.newPasswordRepeated) {
				setError("Hasła muszą być takie same.");
				return;
			}

			passwordReset.mutate({
				authenticationId,
				authenticationValue: data.authenticationValue,
				newPasswordRaw: data.newPassword,
			});
		},
		[passwordReset, authenticationId]
	);

	return (
		<Flex direction={"column"} align={"center"} className={styles["container"]}>
			<PageHeader
				title={"Resetowanie hasła"}
				description={"Na Twój e-mail wysłany został kod, którego możesz użyc poniżej w celu zresetowania hasła."}
			/>

			<Flex direction={"column"} align={"center"} style={{ gap: "2rem", width: "75%" }}>
				<FormInput error={formState.errors.authenticationValue}>
					<Input
						type={"text"}
						placeholder={"kod"}
						fontSize={1.5}
						{...register("authenticationValue", {
							required: {
								value: true,
								message: "Podanie kodu autoryzacji jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.newPassword}>
					<Input
						type={"password"}
						placeholder={"nowe hasło"}
						fontSize={1.5}
						{...register("newPassword", {
							required: {
								value: true,
								message: "Podanie nowego hasła jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.newPasswordRepeated}>
					<Input
						type={"password"}
						placeholder={"nowe hasło (powtórzone)"}
						fontSize={1.5}
						{...register("newPasswordRepeated", {
							required: {
								value: true,
								message: "Powtórzenie nowego hasła jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<Separator />

				<Button
					onClick={handleSubmit((formBody) => formSubmitHandler(formBody))}
					style={{ width: "75%" }}
					disabled={passwordReset.isPending || !formState.isValid}
				>
					<Paragraph style={{ marginInline: "20px" }} fontSize={1.5}>
						{"Potwierdź"}
					</Paragraph>
				</Button>

				<FormError>{error}</FormError>

				{passwordReset.isPending && <Loading />}
			</Flex>
		</Flex>
	);
};
