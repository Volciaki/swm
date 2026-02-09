"use client";

import { useCallback, useEffect, useState, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { Button, Flex, FormError, Loading, Paragraph, Separator, Switch, Image } from "@/ui/atoms";
import type { APIError } from "@/ui/utils";
import { blobToBase64, defaultErrorHandler, floatOnlyValidator, getPolishErrorMessageByMetadata } from "@/ui/utils";
import { apiClient } from "@/ui/providers";
import { ToastType, useMobile, useToast } from "@/ui/hooks";
import { FormFields } from "../FormFields";
import { ImageUpload } from "../ImageUpload";
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
	definitionId?: string;
};

export const AssortmentForm: FC<AssortmentFormProps> = ({ definitionId }) => {
	const router = useRouter();
	const { mobile } = useMobile();
	const { toast } = useToast();

	const apiUtils = apiClient.useUtils();
	const existing = definitionId !== undefined;
	const getAssortment = apiClient.storage.getAssortment.useQuery({ id: definitionId ?? "" }, { enabled: existing });
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

			if (getAssortment.data) router.push("/centrum-zarzadzania/wizualizacja/asortymenty");
		},
	});
	const updateAssortment = apiClient.storage.updateAssortment.useMutation({
		...sharedMutationOptions,
		onSuccess: () => {
			sharedMutationOptions.onSuccess();
			toast({ title: "Sukces!", message: "Zedytowano asortyment.", type: ToastType.SUCCESS });
		},
	});
	const createAssortment = apiClient.storage.createAssortment.useMutation({
		...sharedMutationOptions,
		onSuccess: (data) => {
			sharedMutationOptions.onSuccess();
			router.push(`/centrum-zarzadzania/wizualizacja/asortymenty/${data.id}/edytuj`);
		},
	});

	const {
		control,
		formState,
		handleSubmit,
		setValue,
		reset,
		setError: setFormError,
	} = useForm<AssortmentFormData>({
		mode: "onChange",
		defaultValues: {
			imageBase64: undefined,
		},
	});
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean | undefined>();
	const [imageReloads, setImageReloads] = useState(1);
	const [isImageLoading, setIsImageLoading] = useState(false);

	const reloadImage = useCallback(() => {
		setImageReloads((current) => current + 1);
	}, []);

	const formSubmitHandler = useCallback(
		(data: AssortmentFormData) => {
			setIsLoading(true);

			const imageData = data.imageBase64 ? data.imageBase64.split(",")[1] : null;

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
				isHazardous: data.isHazardous,
				imageContentBase64: imageData,
			};

			if (definitionId) {
				updateAssortment.mutate({
					id: definitionId,
					newData,
				});
			} else {
				createAssortment.mutate(newData);
			}

			reloadImage();
		},
		[setIsLoading, reloadImage, updateAssortment, createAssortment, definitionId]
	);

	const deleteHandler = useCallback(async () => {
		if (!definitionId) return;

		setIsLoading(true);

		deleteAssortment.mutate({ id: definitionId });
	}, [setIsLoading, deleteAssortment, definitionId]);

	const fetchImage = useCallback(async () => {
		setIsImageLoading(true);

		const imageUrl = getAssortment.data?.image?.visibility.publicUrl ?? null;

		if (!imageUrl) {
			setIsImageLoading(false);
			return;
		}

		const res = await fetch(imageUrl);
		const blob = await res.blob();
		const base64 = await blobToBase64(blob);

		setValue("imageBase64", base64, { shouldDirty: false });
		setIsImageLoading(false);
	}, [getAssortment.data, setValue]);

	useEffect(() => {
		(async () => {
			fetchImage();
		})();
	}, [fetchImage]);

	useEffect(() => {
		if (!getAssortment.data) return undefined;

		const data = getAssortment.data;
		const values: AssortmentFormData = {
			name: data.name,
			comment: data.comment,
			expiresAfterDays: data.expiresAfterSeconds / 60 / 60 / 24,
			heightMillimeters: data.size.heightMillimeters,
			widthMillimeters: data.size.widthMillimeters,
			lengthMillimeters: data.size.lengthMillimeters,
			minTemperatureCelsius: data.temperatureRange.minimalCelsius,
			maxTemperatureCelsius: data.temperatureRange.maximalCelsius,
			weightKg: data.weightKg,
			isHazardous: data.isHazardous,
			imageBase64: undefined,
		};

		reset(values);
	}, [getAssortment.data, reset]);

	if (getAssortment.isLoading) return <Loading />;

	if (getAssortment.error) <FormError>{getPolishErrorMessageByMetadata(getAssortment.error.data?.metadata)}</FormError>;

	return (
		<Flex
			className={clsx([commonStyles["form-container"], commonStyles["secondary"]])}
			style={{ width: mobile ? "100%" : "75%" }}
			direction={"column"}
			align={"center"}
		>
			<Flex direction={"column"} style={{ gap: "1rem" }} align={"center"} fullWidth>
				<Paragraph fontSize={mobile ? 1.5 : 1.75}>{"Zdjęcie"}</Paragraph>

				{isImageLoading ? (
					<Loading />
				) : (
					<Controller
						control={control}
						name={"imageBase64"}
						render={({ field: { onChange, value, name }, fieldState: { isDirty, error } }) => (
							<>
								{getAssortment.data?.image && !isDirty && (
									<Image
										src={`${getAssortment.data.image.visibility.publicUrl}?key=${imageReloads}`}
										alt={`Ikona asortymentu ${getAssortment.data?.name}`}
										style={{ maxWidth: `${mobile ? 150 : 300}px`, maxHeight: `${mobile ? 150 : 300}px` }}
									/>
								)}

								<ImageUpload
									dimensions={{ aspectRatio: 1, minHeight: 200, minWidth: 200 }}
									preview={{
										show: isDirty,
										altText: `Ikona asortymentu ${getAssortment.data?.name}`,
										maxHeight: mobile ? 150 : 300,
										maxWidth: mobile ? 150 : 300,
									}}
									onError={(error) => setFormError(name, { message: error })}
									maxSizeBytes={10 * 1024 * 1024}
									onUpload={async (blob) => {
										try {
											const imageInBase64 = await blobToBase64(blob);

											onChange(imageInBase64);

											setFormError(name, { message: undefined });
										} catch (error) {
											setFormError(name, { message: (error as Error).message });
										}
									}}
								>
									<Button>
										<Paragraph fontSize={mobile ? 1.25 : 1.5}>{`${!!value ? "Zmień" : "Dodaj"} zdjęcie`}</Paragraph>

										<Paragraph fontSize={mobile ? 1 : 1.25} variant={"secondary"}>
											{"Minimalne wymiary: 200x200"}

											<br />

											{"Proporcje: 1:1"}
										</Paragraph>
									</Button>
								</ImageUpload>

								<FormError>{error?.message}</FormError>
							</>
						)}
					/>
				)}
			</Flex>

			<FormFields
				control={control}
				sections={[
					{
						name: "Nazwa",
						inputs: [
							{
								placeholder: "Nazwa",
								formKey: "name",
								required: "Podanie nazwy nowego asortymentu jest wymagane.",
							},
						],
					},
					{
						name: "Komentarz",
						inputs: [
							{
								placeholder: "Komentarz",
								formKey: "comment",
								required: "Dla przejrzystości, wymagane jest dodanie komentarza.",
							},
						],
					},
					{
						name: "Wymiary podane w milimetrach",
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
						name: "Zakres temperatur w stopniach Celsjusza",
						inputs: [
							{
								placeholder: "Minimalna temperatura [°C]",
								formKey: "minTemperatureCelsius",
								required: "Podanie minimalnej temperatury asortymentu jest wymagane.",
								validate: (v) =>
									floatOnlyValidator(v.toString(), "Minimalna temperatura asortymentu musi być liczbą dziesiętną."),
							},
							{
								placeholder: "Maksymalna temperatura [°C]",
								formKey: "maxTemperatureCelsius",
								required: "Podanie maksymalnej temperatury asortymentu jest wymagane.",
								validate: (v) =>
									floatOnlyValidator(v.toString(), "Maksymalna temperatura asortymentu musi być liczbą dziesiętną."),
							},
						],
					},
				]}
			/>

			<Flex direction={"column"} style={{ gap: "1rem" }} align={"center"} fullWidth>
				<Paragraph fontSize={mobile ? 1.5 : 1.75}>{"Niebezpieczny"}</Paragraph>

				<Controller
					control={control}
					name={"isHazardous"}
					defaultValue={false}
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

			<Separator style={{ marginBlock: `${mobile ? 0.5 : 1}rem` }} />

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
	);
};
