"use client";

import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
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
	const { register, formState } = useForm<UserFormData>({
		mode: "onChange",
		values: data,
	});
	const [twoFactorAuthenticationEnabled, setTwoFactorAuthenticationEnabled] = useState(
		formState.defaultValues?.twoFactorAuthenticationEnabled ?? false
	);
	const [isAdmin, setIsAdmin] = useState(formState.defaultValues?.isAdmin);

	return (
		<Flex className={styles["container"]} direction={"column"} align={"center"} fullWidth>
			<Paragraph style={{ textAlign: "center" }} fontSize={2.5}>
				{existing ? "Edytuj" : "Dodaj"}
			</Paragraph>

			<Flex className={styles["form-container"]}>
				<Flex direction={"column"} style={{ gap: "1rem", width: "50%" }}>
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

					<Switch checked={twoFactorAuthenticationEnabled} setChecked={setTwoFactorAuthenticationEnabled} />
				</Flex>

				<Flex direction={"column"} align={"center"} justify={"center"} style={{ gap: "1rem", width: "50%" }}>
					<Button>
						<Paragraph style={{ marginInline: "20px" }}>{"Zapisz"}</Paragraph>
					</Button>
					<Button>
						<Paragraph style={{ marginInline: "20px" }}>{"Anuluj"}</Paragraph>
					</Button>

					{existing && (
						<Button danger>
							<Paragraph>{"Usuń"}</Paragraph>
						</Button>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};
