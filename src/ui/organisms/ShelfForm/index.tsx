"use client";

import { type CSSProperties, useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { Button, Flex, Input, Paragraph, Separator } from "@/ui/atoms";
import { FormInput } from "@/ui/molecules";
import { floatOnlyValidator, integerOnlyValidator } from "@/ui/utils";
import commonStyles from "../../../styles/common.module.scss";

type ShelfFormData = {
	name: string;
	comment: string;
	rows: number;
	columns: number;
	maxWeightKg: number;
	maxAssortmentWidthMillimeters: number;
	maxAssortmentHeightMillimeters: number;
	maxAssortmentLengthMillimeters: number;
	minTemperatureCelsius: number;
	maxTemperatureCelsius: number;
};

export type ShelfFormProps = {
	shelfData?: ShelfFormData & { id?: string };
};

export const ShelfForm: FC<ShelfFormProps> = ({ shelfData }) => {
	const { register, formState, handleSubmit } = useForm<ShelfFormData>({
		mode: "onChange",
	});

	const existing = shelfData?.id !== undefined;

	const formSubmitHandler = useCallback((data: ShelfFormData) => {
		console.log(data);
	}, []);

	const deleteHandler = useCallback(() => {
		console.log("deleting!");
	}, []);

	return (
		<Flex
			className={clsx([commonStyles["form-container"], commonStyles["secondary"]])}
			style={{ width: "75%" }}
			direction={"column"}
			align={"center"}
		>
			<Paragraph style={commonParagraphStyles}>{"Oznaczenie regału"}</Paragraph>

			<FormInput error={formState.errors.name} gap={1}>
				<Input
					placeholder={"Oznaczenie"}
					type={"text"}
					fontSize={1.5}
					{...register("name", {
						required: {
							value: true,
							message: "Podanie oznaczenia nowego regału jest wymagane.",
						},
					})}
				/>
			</FormInput>

			<Paragraph style={commonParagraphStyles}>{"Komentarz regału"}</Paragraph>

			<FormInput error={formState.errors.comment} gap={1}>
				<Input
					placeholder={"Komentarz"}
					type={"text"}
					fontSize={1.5}
					{...register("comment", {
						required: {
							value: true,
							message: "Dla przejrzystości, wymagane jest dodanie komentarza.",
						},
					})}
				/>
			</FormInput>

			<Paragraph style={commonParagraphStyles}>{"Rozmiar regału"}</Paragraph>

			<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
				<FormInput error={formState.errors.rows} gap={1}>
					<Input
						placeholder={"Ilość rzędów (M)"}
						fontSize={1.5}
						{...register("rows", {
							required: "Podanie ilości rzędów regału jest wymagane.",
							min: {
								value: 1,
								message: "Regał nie może posiadać mniej niż jednego rzędu.",
							},
							validate: (v) => integerOnlyValidator(v.toString(), "Ilość rzędów regału musi być liczbą całkowitą."),
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.columns} gap={1}>
					<Input
						placeholder={"Ilość kolumn (N)"}
						fontSize={1.5}
						{...register("columns", {
							required: "Podanie ilości kolumn regału jest wymagane.",
							min: {
								value: 1,
								message: "Regał nie może posiadać mniej niż jednej kolumny.",
							},
							validate: (v) => integerOnlyValidator(v.toString(), "Ilość kolumn regału musi być liczbą całkowitą."),
						})}
					/>
				</FormInput>
			</Flex>

			<Paragraph style={commonParagraphStyles}>{"Maksymalna wspierana waga w kilogramach"}</Paragraph>

			<FormInput error={formState.errors.maxWeightKg} gap={1}>
				<Input
					placeholder={"Waga [kg]"}
					fontSize={1.5}
					{...register("maxWeightKg", {
						required: "Podanie maksymalnej wagi jest wymagane.",
						min: {
							value: 0,
							message: "Maksymalna waga nie może być ujemna.",
						},
						validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna waga musi być liczbą dziesiętną."),
					})}
				/>
			</FormInput>

			<Paragraph style={commonParagraphStyles}>{"Maksymalne wymiary asortymentu podane w milimetrach"}</Paragraph>

			<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
				<FormInput error={formState.errors.maxAssortmentWidthMillimeters} gap={1}>
					<Input
						placeholder={"Szerokość [mm]"}
						fontSize={1.5}
						{...register("maxAssortmentWidthMillimeters", {
							required: "Podanie maksymalnej szerokości asortymentu jest wymagane.",
							min: {
								value: 0,
								message: "Dystans nie może być ujemny.",
							},
							validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna szerokość musi być liczbą dziesiętną."),
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.maxAssortmentHeightMillimeters} gap={1}>
					<Input
						placeholder={"Wysokość [mm]"}
						fontSize={1.5}
						{...register("maxAssortmentHeightMillimeters", {
							required: "Podanie maksymalnej wysokości asortymentu jest wymagane.",
							min: {
								value: 0,
								message: "Dystans nie może być ujemny.",
							},
							validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna wysokość musi być liczbą dziesiętną."),
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.maxAssortmentLengthMillimeters} gap={1}>
					<Input
						placeholder={"Głębokość [mm]"}
						fontSize={1.5}
						{...register("maxAssortmentLengthMillimeters", {
							required: "Podanie maksymalnej głębokości asortymentu jest wymagane.",
							min: {
								value: 0,
								message: "Dystans nie może być ujemny.",
							},
							validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna głębokość musi być liczbą dziesiętną."),
						})}
					/>
				</FormInput>
			</Flex>

			<Paragraph style={commonParagraphStyles}>{"Zakres temperatur regału w stopniach Celsjusza"}</Paragraph>

			<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
				<FormInput error={formState.errors.minTemperatureCelsius} gap={1}>
					<Input
						placeholder={"temperatura minimalna [°C]"}
						fontSize={1.5}
						{...register("minTemperatureCelsius", {
							required: "Podanie minimalnej temperatury regału jest wymagane.",
							validate: (v) =>
								floatOnlyValidator(v.toString(), "Minimalna temperatura regału musi być liczbą dziesiętną."),
						})}
					/>
				</FormInput>

				<FormInput error={formState.errors.maxTemperatureCelsius} gap={1}>
					<Input
						placeholder={"temperatura maksymalna [°C]"}
						fontSize={1.5}
						{...register("maxTemperatureCelsius", {
							required: "Podanie maksymalnej temperatury regału jest wymagane.",
							validate: (v) =>
								floatOnlyValidator(v.toString(), "Maksymalna temperatura regału musi być liczbą dziesiętną."),
						})}
					/>
				</FormInput>
			</Flex>

			<Separator style={{ marginBlock: "1rem" }} />

			<Flex direction={"row"} justify={"space-around"} fullWidth>
				<Button onClick={handleSubmit(formSubmitHandler)} disabled={!formState.isValid} style={{ width: "30%" }}>
					<Paragraph>{"Podtwierdź"}</Paragraph>
				</Button>

				{existing && (
					<Button onClick={() => deleteHandler()} style={{ width: "30%" }} danger>
						<Paragraph>{"Usuń"}</Paragraph>
					</Button>
				)}
			</Flex>
		</Flex>
	);
};
