"use client";

import { useCallback, useMemo, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { Button, Flex, FormError, Loading, Paragraph, Separator } from "@/ui/atoms";
import type { APIError } from "@/ui/utils";
import { defaultErrorHandler, floatOnlyValidator, getPolishErrorMessageByMetadata } from "@/ui/utils";
import { apiClient } from "@/ui/providers";
import { FormFields } from "../FormFields";
import commonStyles from "../../../styles/common.module.scss";

type AssortmentFormData = {
	name: string;
	comment: string;
	widthMillimeters: number;
	heightMillimeters: number;
	lengthMillimeters: number;
	weightKg: number;
	expiresAfterDays: number;
	minTemperatureCelsius: number;
	maxTemperatureCelsius: number;
	isHazardous: boolean;
	imageBase64?: string;
};

export type AssortmentFormProps = {
	shelfId: string;
	cellId: string;
	assortmentId?: string;
};

export const AssortmentForm: FC<AssortmentFormProps> = ({ shelfId, cellId, assortmentId }) => {
	const router = useRouter();

	const apiUtils = apiClient.useUtils();
	const existing = assortmentId !== undefined;
	const getAssortment = apiClient.storage.getAssortment.useQuery({ id: assortmentId ?? "" }, { enabled: existing });
	const sharedMutationOptions = {
		onSuccess: () => {
			apiUtils.storage.invalidate();
			setError(undefined);
		},
		onError: (e: APIError) => defaultErrorHandler(e, (errorMessage) => setError(errorMessage)),
		onSettled: () => setIsLoading(false),
	};
	const deleteAssortment = apiClient.storage.deleteAssortment.useMutation({
		...sharedMutationOptions,
		onSuccess: () => {
			sharedMutationOptions.onSuccess();

			if (getAssortment.data)
				router.push(`/centrum-zarzadzania/wizualizacja/regaly/${getAssortment.data.shelfId}/wyswietl`);
		},
	});
	// const updateAssortment = apiClient.storage.updateAssortment.useMutation(sharedMutationOptions);
	const createAssortment = apiClient.storage.createAssortment.useMutation({
		...sharedMutationOptions,
		onSuccess: (data) => {
			sharedMutationOptions.onSuccess();
			router.push("/centrum-zarzadzania/wizualizacja/asortymenty");
		},
	});

	const values: AssortmentFormData | undefined = useMemo(() => {
		if (!getAssortment.data) return undefined;

		const data = getAssortment.data;
		const v: AssortmentFormData = {
			name: data.definition.name,
			comment: data.definition.comment,
			expiresAfterDays: data.definition.expiresAfterSeconds / 60 / 60 / 24,
			heightMillimeters: data.definition.size.heightMillimeters,
			widthMillimeters: data.definition.size.widthMillimeters,
			lengthMillimeters: data.definition.size.lengthMillimeters,
			minTemperatureCelsius: data.definition.temperatureRange.minimalCelsius,
			maxTemperatureCelsius: data.definition.temperatureRange.maximalCelsius,
			weightKg: data.definition.weightKg,
			// TODO: ...
			imageBase64: undefined,
			isHazardous: false,
		};
		return v;
	}, [getAssortment.data]);
	const { control, formState, handleSubmit } = useForm<AssortmentFormData>({
		mode: "onChange",
		values,
	});
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean | undefined>();

	const formSubmitHandler = useCallback(
		(data: AssortmentFormData) => {
			setIsLoading(true);

			const newData = {
				name: data.name,
				weightKg: Number(data.weightKg),
				temperatureRange: {
					minimalCelsius: Number(data.minTemperatureCelsius),
					maximalCelsius: Number(data.maxTemperatureCelsius),
				},
				size: {
					lengthMillimeters: Number(data.lengthMillimeters),
					widthMillimeters: Number(data.widthMillimeters),
					heightMillimeters: Number(data.heightMillimeters),
				},
				expiresAfterSeconds: Math.round(Number(data.expiresAfterDays) * 24 * 60 * 60),
				comment: data.comment,
				// TODO: ...
				imageContentBase64: null,
				isHazardous: false,
			};

			// if (assortmentId) {
			// 	updateAssortment.mutate({
			// 		id: assortmentId,
			// 		newData,
			// 	});
			// } else {
			// 	createAssortment.mutate({
			// 		shelfId,
			// 		cellId,
			// 		assortment: newData,
			// 	});
			// }
			createAssortment.mutate(newData);
		},
		[setIsLoading, shelfId, cellId, assortmentId /*, updateAssortment*/, createAssortment]
	);

	const deleteHandler = useCallback(async () => {
		if (!assortmentId) return;

		setIsLoading(true);

		deleteAssortment.mutate({ id: assortmentId });
	}, [setIsLoading, deleteAssortment, assortmentId]);

	if (getAssortment.isLoading) return <Loading />;

	return (
		<>
			{getAssortment.error && (
				<FormError>{getPolishErrorMessageByMetadata(getAssortment.error.data?.metadata)}</FormError>
			)}

			<Flex
				className={clsx([commonStyles["form-container"], commonStyles["secondary"]])}
				style={{ width: "75%" }}
				direction={"column"}
				align={"center"}
			>
				<FormFields
					control={control}
					sections={[
						{
							name: "Nazwa asortymentu",
							inputs: [
								{
									placeholder: "Nazwa",
									formKey: "name",
									required: "Podanie nazwy nowego asortymentu jest wymagane.",
								},
							],
						},
						{
							name: "Komentarz asortymentu",
							inputs: [
								{
									placeholder: "Komentarz",
									formKey: "comment",
									required: "Dla przejrzystości, wymagane jest dodanie komentarza.",
								},
							],
						},
						{
							name: "Wymiary asortymentu podane w milimetrach",
							inputs: [
								{
									placeholder: "Szerokość [mm]",
									formKey: "widthMillimeters",
									required: "Podanie szerokości asortymentu jest wymagane.",
									min: {
										value: 0,
										message: "Dystans nie może być ujemny.",
									},
									validate: (v) => floatOnlyValidator(v.toString(), "Szerokość musi być liczbą dziesiętną."),
								},
								{
									placeholder: "Wysokość [mm]",
									formKey: "heightMillimeters",
									required: "Podanie wysokości asortymentu jest wymagane.",
									min: {
										value: 0,
										message: "Dystans nie może być ujemny.",
									},
									validate: (v) => floatOnlyValidator(v.toString(), "Wysokość musi być liczbą dziesiętną."),
								},
								{
									placeholder: "Głębokość [mm]",
									formKey: "lengthMillimeters",
									required: "Podanie głębokości asortymentu jest wymagane.",
									min: {
										value: 0,
										message: "Dystans nie może być ujemny.",
									},
									validate: (v) => floatOnlyValidator(v.toString(), "Głębokość musi być liczbą dziesiętną."),
								},
							],
						},
						{
							name: "Waga w kilogramach",
							inputs: [
								{
									placeholder: "Waga [kg]",
									formKey: "weightKg",
									required: "Podanie wagi jest wymagane.",
									min: {
										value: 0,
										message: "Waga nie może być ujemna.",
									},
									validate: (v) => floatOnlyValidator(v.toString(), "Waga musi być liczbą dziesiętną."),
								},
							],
						},
						{
							name: "Termin ważności w dniach od przyjęcia do magazynu",
							inputs: [
								{
									placeholder: "Ilość dni",
									formKey: "expiresAfterDays",
									required: "Podanie terminu ważności jest wymagane.",
									min: {
										value: 0,
										message: "Asortyment nie może być przedawniony w czasie przyjmowania na stan magazynu.",
									},
									validate: (v) => floatOnlyValidator(v.toString(), "Termin ważności musi być liczbą dziesiętną."),
								},
							],
						},
						{
							name: "Zakres temperatur asortymentu w stopniach Celsjusza",
							inputs: [
								{
									placeholder: "Temperatura minimalna [°C]",
									formKey: "minTemperatureCelsius",
									required: "Podanie minimalnej temperatury asortymentu jest wymagane.",
									validate: (v) =>
										floatOnlyValidator(v.toString(), "Minimalna temperatura asortymentu musi być liczbą dziesiętną."),
								},
								{
									placeholder: "Temperatura maksymalna [°C]",
									formKey: "maxTemperatureCelsius",
									required: "Podanie maksymalnej temperatury asortymentu jest wymagane.",
									validate: (v) =>
										floatOnlyValidator(v.toString(), "Maksymalna temperatura asortymentu musi być liczbą dziesiętną."),
								},
							],
						},
					]}
				/>

				<Separator style={{ marginBlock: "1rem" }} />

				<Flex direction={"row"} justify={"space-around"} fullWidth>
					<Button
						onClick={handleSubmit(formSubmitHandler)}
						disabled={!formState.isValid || isLoading}
						style={{ width: "30%" }}
					>
						<Paragraph>{"Potwierdź"}</Paragraph>
					</Button>

					{existing && (
						<Button onClick={() => deleteHandler()} style={{ width: "30%" }} danger>
							<Paragraph>{"Usuń"}</Paragraph>
						</Button>
					)}
				</Flex>

				{error && <FormError>{error}</FormError>}

				{isLoading && <Loading />}
			</Flex>
		</>
	);
};
