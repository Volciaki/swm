"use client";

import { useCallback, useMemo, useState, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { Button, Flex, FormError, Loading, Paragraph, Separator, Switch } from "@/ui/atoms";
import type { APIError } from "@/ui/utils";
import {
	defaultErrorHandler,
	floatOnlyValidator,
	getPolishErrorMessageByMetadata,
	integerOnlyValidator,
} from "@/ui/utils";
import { apiClient } from "@/ui/providers";
import { useMobile } from "@/ui/hooks";
import { FormFields } from "../FormFields";
import commonStyles from "../../../styles/common.module.scss";

type ShelfFormData = {
	name: string;
	comment: string;
	rows?: number;
	columns?: number;
	maxWeightKg: number;
	maxAssortmentWidthMillimeters: number;
	maxAssortmentHeightMillimeters: number;
	maxAssortmentLengthMillimeters: number;
	minTemperatureCelsius: number;
	maxTemperatureCelsius: number;
	supportsHazardous: boolean;
};

export type ShelfFormProps = {
	shelfId?: string;
};

export const ShelfForm: FC<ShelfFormProps> = ({ shelfId }) => {
	const router = useRouter();

	const { mobile } = useMobile();
	const apiUtils = apiClient.useUtils();
	const existing = shelfId !== undefined;
	const getShelf = apiClient.storage.getShelf.useQuery({ id: shelfId ?? "" }, { enabled: existing });
	const sharedMutationOptions = {
		onSuccess: () => {
			apiUtils.storage.invalidate();
			setError(undefined);
		},
		onError: (e: APIError) => defaultErrorHandler(e, (errorMessage) => setError(errorMessage)),
		onSettled: () => setIsLoading(false),
	};
	const deleteShelf = apiClient.storage.deleteShelf.useMutation({
		...sharedMutationOptions,
		onSuccess: () => {
			sharedMutationOptions.onSuccess();
			router.push("/centrum-zarzadzania/wizualizacja");
		},
	});
	const updateShelf = apiClient.storage.updateShelf.useMutation(sharedMutationOptions);
	const createShelf = apiClient.storage.createShelf.useMutation({
		...sharedMutationOptions,
		onSuccess: (data) => {
			sharedMutationOptions.onSuccess();
			router.push(`/centrum-zarzadzania/wizualizacja/regaly/${data.id}/edytuj`);
		},
	});

	const values: ShelfFormData | undefined = useMemo(() => {
		if (!getShelf.data) return undefined;

		const data = getShelf.data;
		const v: ShelfFormData = {
			rows: undefined,
			columns: undefined,
			comment: data.comment,
			name: data.name,
			maxAssortmentHeightMillimeters: data.maxAssortmentSize.heightMillimeters,
			maxAssortmentLengthMillimeters: data.maxAssortmentSize.lengthMillimeters,
			maxAssortmentWidthMillimeters: data.maxAssortmentSize.widthMillimeters,
			maxTemperatureCelsius: data.temperatureRange.maximalCelsius,
			minTemperatureCelsius: data.temperatureRange.minimalCelsius,
			maxWeightKg: data.maxWeightKg,
			supportsHazardous: data.supportsHazardous,
		};
		return v;
	}, [getShelf.data]);
	const { control, formState, handleSubmit } = useForm<ShelfFormData>({
		mode: "onChange",
		values,
	});
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean | undefined>();

	const formSubmitHandler = useCallback(
		(data: ShelfFormData) => {
			setIsLoading(true);

			const newData = {
				name: data.name,
				comment: data.comment,
				maxAssortmentSize: {
					heightMillimeters: Number(data.maxAssortmentHeightMillimeters),
					lengthMillimeters: Number(data.maxAssortmentLengthMillimeters),
					widthMillimeters: Number(data.maxAssortmentWidthMillimeters),
				},
				maxWeightKg: Number(data.maxWeightKg),
				temperatureRange: {
					maximalCelsius: Number(data.maxTemperatureCelsius),
					minimalCelsius: Number(data.minTemperatureCelsius),
				},
				cellsShape: {
					rows: Number(data.rows ?? 1),
					columns: Number(data.columns ?? 1),
				},
				supportsHazardous: data.supportsHazardous,
			};

			if (shelfId) {
				updateShelf.mutate({
					shelfId,
					newData,
				});
			} else {
				createShelf.mutate(newData);
			}
		},
		[setIsLoading, createShelf, shelfId, updateShelf]
	);

	const deleteHandler = useCallback(async () => {
		if (!shelfId) return;

		setIsLoading(true);

		deleteShelf.mutate({ id: shelfId });
	}, [setIsLoading, deleteShelf, shelfId]);

	if (getShelf.isLoading) return <Loading />;

	return (
		<>
			{getShelf.error && <FormError>{getPolishErrorMessageByMetadata(getShelf.error.data?.metadata)}</FormError>}

			<Flex
				className={clsx([commonStyles["form-container"], commonStyles["secondary"]])}
				style={{ width: mobile ? "100%" : "75%", gap: mobile ? "1rem" : undefined }}
				direction={"column"}
				align={"center"}
			>
				<FormFields
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
						...(existing
							? []
							: [
									{
										name: "Rozmiar regału",
										inputs: [
											{
												placeholder: "Ilość rzędów (M)",
												formKey: "rows" as const,
												required: "Podanie ilości rzędów regału jest wymagane.",
												min: {
													value: 1,
													message: "Regał nie może posiadać mniej niż jednego rzędu.",
												},
												validate: (v: string | number) =>
													integerOnlyValidator(v.toString(), "Ilość rzędów regału musi być liczbą całkowitą."),
											},
											{
												placeholder: "Ilość kolumn (N)",
												formKey: "columns" as const,
												required: "Podanie ilości kolumn regału jest wymagane.",
												min: {
													value: 1,
													message: "Regał nie może posiadać mniej niż jednej kolumny.",
												},
												validate: (v: string | number) =>
													integerOnlyValidator(v.toString(), "Ilość kolumn regału musi być liczbą całkowitą."),
											},
										],
									},
								]),
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
							name: "Maksymalne wymiary w milimetrach",
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
									placeholder: "Minimalna temperatura [°C]",
									formKey: "minTemperatureCelsius",
									required: "Podanie minimalnej temperatury regału jest wymagane.",
									validate: (v) =>
										floatOnlyValidator(v.toString(), "Minimalna temperatura regału musi być liczbą dziesiętną."),
								},
								{
									placeholder: "Maksymalna temperatura [°C]",
									formKey: "maxTemperatureCelsius",
									required: "Podanie maksymalnej temperatury regału jest wymagane.",
									validate: (v) =>
										floatOnlyValidator(v.toString(), "Maksymalna temperatura regału musi być liczbą dziesiętną."),
								},
							],
						},
					]}
				/>

				<Flex direction={"column"} style={{ gap: "1rem" }} align={"center"} fullWidth>
					<Paragraph fontSize={mobile ? 1.5 : 1.75}>{"Wspiera niebezpieczne"}</Paragraph>

					<Controller
						control={control}
						name={"supportsHazardous"}
						defaultValue={values?.supportsHazardous ?? false}
						render={({ field }) => (
							<Flex direction={"row"} style={{ gap: "1rem" }} justify={"center"}>
								<Switch checked={field.value} setChecked={field.onChange} size={mobile ? 1.25 : 1.5} />

								<Paragraph fontSize={mobile ? 1.25 : 1.5} variant={"secondary"}>
									{"Nie/Tak"}
								</Paragraph>
							</Flex>
						)}
					/>
				</Flex>

				<Separator style={{ marginBlock: mobile ? "0.5rem" : "1rem" }} />

				<Flex direction={"row"} justify={"space-around"} fullWidth>
					<Button
						onClick={handleSubmit(formSubmitHandler)}
						disabled={!formState.isValid || isLoading}
						style={{ width: mobile ? undefined : "30%" }}
					>
						<Paragraph fontSize={mobile ? 1.5 : 2}>{"Potwierdź"}</Paragraph>
					</Button>

					{existing && (
						<Button onClick={() => deleteHandler()} style={{ width: mobile ? undefined : "30%" }} danger>
							<Paragraph fontSize={mobile ? 1.5 : 2}>{"Usuń"}</Paragraph>
						</Button>
					)}
				</Flex>

				{error && <FormError>{error}</FormError>}

				{isLoading && <Loading />}
			</Flex>
		</>
	);
};
