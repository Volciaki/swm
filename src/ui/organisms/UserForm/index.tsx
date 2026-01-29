"use client";

import { type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormInput } from "@/ui/molecules";
import { Flex, Input, Paragraph, Button, Switch } from "@/ui/atoms";
import styles from "./index.module.scss";

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
	existing?: boolean;
	data?: UserFormData;
};

export const UserForm: FC<UserFormProps> = ({ data = defaultUserFormData, existing = false }) => {
	const { register, control, formState } = useForm<UserFormData>({
		mode: "onChange",
		values: data,
	});

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
						placeholder={"hasło"}
						type={"password"}
						fontSize={1.5}
						{...register("password", {
							required: {
								value: true,
								message: "Podanie hasła jest wymagane.",
							},
							minLength: {
								value: 3,
								message: "Wybierz dłuższe hasło.",
							},
						})}
					/>
				</FormInput>

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
					<Button style={{ width: !existing ? "auto" : "25%" }}>
						<Paragraph>{"Zapisz"}</Paragraph>
					</Button>

					{existing && (
						<Button style={{ width: "25%" }} danger>
							<Paragraph>{"Usuń"}</Paragraph>
						</Button>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};
