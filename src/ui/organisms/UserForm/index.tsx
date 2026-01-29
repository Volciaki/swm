"use client";

import { useCallback, useState, type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormInput } from "@/ui/molecules";
import { Flex, Input, Paragraph, Button, Switch, Loading, FormError } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";
import type { BaseErrorMetadata } from "@/server/utils/errors/base";
import styles from "./index.module.scss";
import { UserDTO } from "@/server/utils";
import { PublicUserDTO } from "@/server/modules/identity/application/dto/shared/PublicUserDTO";

type UserFormData = {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	twoFactorAuthenticationEnabled: boolean;
};

const defaultUserFormData: UserFormData = {
	name: "",
	email: "",
	password: "",
	isAdmin: false,
	twoFactorAuthenticationEnabled: false,
};

export type UserFormProps = {
	userData?: UserFormData & { id?: string };
};

export const UserForm: FC<UserFormProps> = ({ userData = defaultUserFormData }) => {
	const [error, setError] = useState<string | undefined>();
	const [data, setData] = useState<UserFormData & { id?: string }>(userData);
	const userId = data.id;

	const apiUtils = apiClient.useUtils();
	const sharedMutationOptions = {
		onSuccess: (data: UserDTO | PublicUserDTO) => {
			updateFormState(data);

			apiUtils.identity.invalidate();
		},
		onError: (error: { data?: { metadata: unknown } | null }) => {
			if (!error?.data) return;

			const errorMessage = getPolishErrorMessageByMetadata(error.data.metadata as BaseErrorMetadata);
			setError(errorMessage);
		},
	};
	const createUser = apiClient.identity.createUser.useMutation(sharedMutationOptions);
	const updateUser = apiClient.identity.updateUser.useMutation(sharedMutationOptions);
	const deleteUser = apiClient.identity.deleteUser.useMutation(sharedMutationOptions);
	const { register, control, formState, handleSubmit, reset } = useForm<UserFormData>({
		mode: "onChange",
		values: userData,
	});

	const existing = userId !== undefined;
	const loading = deleteUser.isPending || createUser.isPending || updateUser.isPending;

	const updateFormState = useCallback(
		(newData: Omit<UserFormData, "password">) => {
			const newFormData = { ...newData, password: "" };
			setData(newFormData);
			reset(newFormData);
		},
		[reset]
	);

	const formSubmitHandler = useCallback(
		async (data: UserFormData) => {
			const newData = {
				passwordRaw: data.password,
				...data,
			};

			if (userId) {
				updateUser.mutate({
					id: userId,
					newData,
				});
				return;
			}

			createUser.mutate(newData);
		},
		[userId, updateUser, createUser]
	);

	const handleDeletion = useCallback(async () => {
		if (!userId) return;

		await deleteUser.mutateAsync({ id: userId });
	}, [userId, deleteUser]);

	return (
		<Flex className={styles["container"]} direction={"column"} align={"center"} fullWidth>
			<Paragraph style={{ textAlign: "center" }} fontSize={2.5}>
				{existing ? "Edytuj" : "Dodaj"}
			</Paragraph>

			<Flex direction={"column"} align={"center"} className={styles["form-container"]}>
				<FormInput error={formState.errors.name} gap={1}>
					<Input
						placeholder={"nazwa"}
						type={"text"}
						fontSize={1.5}
						{...register("name", {
							required: {
								value: true,
								message: "Podanie nazwy użytkownika jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.email} gap={1}>
					<Input
						placeholder={"e-mail"}
						type={"email"}
						fontSize={1.5}
						{...register("email", {
							required: {
								value: true,
								message: "Podanie e-mail'a jest wymagane.",
							},
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.password} gap={1}>
					<Input
						placeholder={`hasło ${existing ? "*" : ""}`}
						type={"password"}
						fontSize={1.5}
						{...register("password", {
							required: {
								value: !existing,
								message: "Podanie hasła jest wymagane.",
							},
						})}
					/>
				</FormInput>

				{existing && (
					<Paragraph variant={"secondary"} fontSize={1.25} style={{ width: "100%" }}>
						{"* Zostaw puste, jeśli nie chcesz zmieniać"}
					</Paragraph>
				)}

				<Controller
					control={control}
					name={"isAdmin"}
					defaultValue={data.isAdmin}
					render={({ field }) => (
						<Flex direction={"row"} style={{ gap: "1rem" }} align={"center"} fullWidth>
							<Switch checked={field.value} setChecked={field.onChange} />

							<Paragraph fontSize={1.5} variant={"secondary"}>
								{"Administrator"}
							</Paragraph>
						</Flex>
					)}
				/>

				<Controller
					control={control}
					name={"twoFactorAuthenticationEnabled"}
					defaultValue={data.isAdmin}
					render={({ field }) => (
						<Flex direction={"row"} style={{ gap: "1rem" }} align={"center"} fullWidth>
							<Switch checked={field.value} setChecked={field.onChange} />

							<Paragraph fontSize={1.5} variant={"secondary"} ellipsisOverflow>
								{"Weryfikacja dwuetapowa"}
							</Paragraph>
						</Flex>
					)}
				/>

				<Flex direction={"row"} align={"center"} justify={"space-around"} fullWidth>
					<Button
						style={{ width: !existing ? "auto" : "30%" }}
						onClick={handleSubmit((formBody) => formSubmitHandler(formBody))}
						disabled={loading || !formState.isValid}
					>
						<Paragraph>{"Zapisz"}</Paragraph>
					</Button>

					{/* TODO: add a dialog confirmation deleting data */}
					{existing && (
						<Button
							style={{ width: "30%" }}
							onClick={() => handleDeletion()}
							disabled={loading || !formState.isValid}
							danger
						>
							<Paragraph>{"Usuń"}</Paragraph>
						</Button>
					)}
				</Flex>
			</Flex>

			{loading && <Loading />}

			{error && <FormError>{error}</FormError>}
		</Flex>
	);
};
