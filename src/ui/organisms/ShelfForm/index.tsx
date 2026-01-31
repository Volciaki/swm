"use client";

import { useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { Button, Flex, Paragraph, Separator } from "@/ui/atoms";
import { floatOnlyValidator, integerOnlyValidator } from "@/ui/utils";
import { FormFields } from "../FormFields";
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
	const { control, formState, handleSubmit } = useForm<ShelfFormData>({
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
			<FormFields
				errors={formState.errors}
				control={control}
				sections={[
					{
						name: "Oznaczenie regału",
						inputs: [
							{
								placeholder: "Oznaczenie",
								formKey: "name",
								required: "Podanie oznaczenia nowego regału jest wymagane.",
							},
						],
					},
					{
						name: "Komentarz regału",
						inputs: [
							{
								placeholder: "Komentarz",
								formKey: "comment",
								required: "Dla przejrzystości, wymagane jest dodanie komentarza.",
							},
						],
					},
					{
						name: "Rozmiar regału",
						inputs: [
							{
								placeholder: "Ilość rzędów (M)",
								formKey: "rows",
								required: "Podanie ilości rzędów regału jest wymagane.",
								min: {
									value: 1,
									message: "Regał nie może posiadać mniej niż jednego rzędu.",
								},
								validate: (v) => integerOnlyValidator(v.toString(), "Ilość rzędów regału musi być liczbą całkowitą."),
							},
							{
								placeholder: "Ilość kolumn (N)",
								formKey: "columns",
								required: "Podanie ilości kolumn regału jest wymagane.",
								min: {
									value: 1,
									message: "Regał nie może posiadać mniej niż jednej kolumny.",
								},
								validate: (v) => integerOnlyValidator(v.toString(), "Ilość kolumn regału musi być liczbą całkowitą."),
							},
						],
					},
					{
						name: "Maksymalna wspierana waga w kilogramach",
						inputs: [
							{
								placeholder: "Waga [kg]",
								formKey: "maxWeightKg",
								required: "Podanie maksymalnej wagi jest wymagane.",
								min: {
									value: 0,
									message: "Maksymalna waga nie może być ujemna.",
								},
								validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna waga musi być liczbą dziesiętną."),
							},
						],
					},
					{
						name: "Maksymalne wymiary asortymentu podane w milimetrach",
						inputs: [
							{
								placeholder: "Szerokość [mm]",
								formKey: "maxAssortmentWidthMillimeters",
								required: "Podanie maksymalnej szerokości asortymentu jest wymagane.",
								min: {
									value: 0,
									message: "Dystans nie może być ujemny.",
								},
								validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna szerokość musi być liczbą dziesiętną."),
							},
							{
								placeholder: "Wysokość [mm]",
								formKey: "maxAssortmentHeightMillimeters",
								required: "Podanie maksymalnej wysokości asortymentu jest wymagane.",
								min: {
									value: 0,
									message: "Dystans nie może być ujemny.",
								},
								validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna wysokość musi być liczbą dziesiętną."),
							},
							{
								placeholder: "Głębokość [mm]",
								formKey: "maxAssortmentLengthMillimeters",
								required: "Podanie maksymalnej głębokości asortymentu jest wymagane.",
								min: {
									value: 0,
									message: "Dystans nie może być ujemny.",
								},
								validate: (v) => floatOnlyValidator(v.toString(), "Maksymalna głębokość musi być liczbą dziesiętną."),
							},
						],
					},
					{
						name: "Zakres temperatur regału w stopniach Celsjusza",
						inputs: [
							{
								placeholder: "temperatura minimalna [°C]",
								formKey: "minTemperatureCelsius",
								required: "Podanie minimalnej temperatury regału jest wymagane.",
								validate: (v) =>
									floatOnlyValidator(v.toString(), "Minimalna temperatura regału musi być liczbą dziesiętną."),
							},
							{
								placeholder: "temperatura maksymalna [°C]",
								formKey: "maxTemperatureCelsius",
								required: "Podanie maksymalnej temperatury regału jest wymagane.",
								validate: (v) =>
									floatOnlyValidator(v.toString(), "Maksymalna temperatura regału musi być liczbą dziesiętną."),
							},
						],
					},
				]}
			/>

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
