"use client";

import Papa from "papaparse";
import { useCallback, useState, type FC } from "react";
import { DialogButton, QRCodeScanner, StandardFileUpload, VisualisationAction } from "@/ui/organisms";
import { List, ListItem, PageHeader } from "@/ui/molecules";
import { Button, Flex, FullHeight, Loading, Paragraph, Separator, Link, FormError } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import type { APIError } from "@/ui/utils";
import { defaultErrorHandler, getPolishErrorMessageByMetadata } from "@/ui/utils";
import commonStyles from "@/styles/common.module.scss";
import styles from "@/styles/assortments.module.scss";

type CSVAssortment = {
	Nazwa: string;
	Id: string;
	Zdjecie: string;
	TempMin: number;
	TempMax: number;
	Waga: number;
	SzerokoscMm: number;
	WysokoscMm: number;
	GlebokoscMm: number;
	Komentarz: string;
	TerminWaznosciDni: number;
	CzyNiebezpieczny: boolean;
};

const AssortmentsVisualisation: FC = () => {
	const apiUtils = apiClient.useUtils();
	const importAssortment = apiClient.storage.importAssortment.useMutation({
		onError: (e) => defaultErrorHandler(e, (message) => setImportAssortmentError(message)),
		onSuccess: () => {
			apiUtils.storage.invalidate();
		},
	});
	const sharedMutationOptionsQRCodeActions = {
		onSuccess: () => {
			apiUtils.storage.invalidate();
			setQRCodeActionError(undefined);
		},
		onError: (e: APIError) => defaultErrorHandler(e, (errorMessage) => setQRCodeActionError(errorMessage)),
	};
	const putUpAssortmentAutomatically = apiClient.storage.putUpAssortmentAutomatically.useMutation(
		sharedMutationOptionsQRCodeActions
	);
	const takeDownOldestAssortmentByDefinition = apiClient.storage.takeDownOldestAssortmentByDefinition.useMutation(
		sharedMutationOptionsQRCodeActions
	);
	const allAssortments = apiClient.storage.getAllAssortments.useQuery();
	const [fileUploadError, setFileUploadError] = useState<string | undefined>();
	const [file, setFile] = useState<File | undefined>();
	const [importAssortmentError, setImportAssortmentError] = useState<string | undefined>();
	const [qrCodeScannerIsPaused, setQRCodeScannerIsPaused] = useState(true);
	const [qrCodeScannerValue, setQRCodeScannerValue] = useState<string | undefined>();
	const [qrCodeActionError, setQRCodeActionError] = useState<string | undefined>();

	const importAssortmentSubmitHandler = useCallback(async () => {
		if (!file) return;

		const text = await file.text();
		const result = Papa.parse<CSVAssortment>(text, {
			header: true,
			skipEmptyLines: true,
			delimiter: ";",
			dynamicTyping: {
				TempMin: true,
				TempMax: true,
				Waga: true,
				SzerokoscMm: true,
				WysokoscMm: true,
				GlebokoscMm: true,
				TerminWaznosciDni: true,
				CzyNiebezpieczny: true,
			},
		});

		importAssortment.mutate({
			definitions: result.data.map((row) => ({
				expiresAfterSeconds: row.TerminWaznosciDni * 24 * 60 * 60,
				comment: row.Komentarz,
				isHazardous: row.CzyNiebezpieczny,
				name: row.Nazwa,
				weightKg: row.Waga,
				size: {
					heightMillimeters: row.WysokoscMm,
					widthMillimeters: row.SzerokoscMm,
					lengthMillimeters: row.GlebokoscMm,
				},
				temperatureRange: {
					maximalCelsius: row.TempMax,
					minimalCelsius: row.TempMin,
				},
				// TODO: allow passing in the image in other ways. Perhaps specify and ID to already existing assortment's one?
				imageContentBase64: null,
			})),
		});
	}, [file, importAssortment]);

	const onQRCodeScan = useCallback((value: unknown) => {
		const parsed = JSON.parse(value as string);
		setQRCodeScannerValue(parsed);
	}, []);

	const addNewAssortmentByQRCodeValue = useCallback(() => {
		putUpAssortmentAutomatically.mutate({ definitionId: qrCodeScannerValue ?? "" });
	}, [putUpAssortmentAutomatically, qrCodeScannerValue]);

	const takeDownAssortmentByQRCodeValue = useCallback(() => {
		takeDownOldestAssortmentByDefinition.mutate({ definitionId: qrCodeScannerValue ?? "" });
	}, [takeDownOldestAssortmentByDefinition, qrCodeScannerValue]);

	return (
		<FullHeight style={{ maxWidth: "100%" }}>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Asortymenty"}
					description={"Zarządzaj asortymentami. Możesz je tworzyć, aktualizaować, usuwać oraz importować."}
				/>

				<Flex direction={"column"} className={commonStyles["form-container"]} fullWidth>
					<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
						<VisualisationAction title={"Importuj asortymenty z pliku CSV"}>
							<DialogButton
								buttonContent={
									<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
										{"Importuj"}
									</Paragraph>
								}
							>
								<Paragraph fontSize={1.5}>{"Przesuń plik na pole poniżej lub klknij w nie aby wybrać plik"}</Paragraph>

								<StandardFileUpload
									accept={"text/csv"}
									onError={(error) => setFileUploadError(error)}
									maxSizeBytes={1024 * 1024}
									onUpload={(data) => {
										setFile(data);
										setFileUploadError(undefined);
									}}
								/>

								{fileUploadError && <FormError>{fileUploadError}</FormError>}

								{file && <Paragraph fontSize={1.5}>{`Wybrany plik: ${file.name}`}</Paragraph>}

								<Button onClick={() => importAssortmentSubmitHandler()} disabled={!file || importAssortment.isPending}>
									<Paragraph fontSize={1.75}>{"Importuj"}</Paragraph>
								</Button>

								{importAssortmentError && <FormError>{importAssortmentError}</FormError>}

								{importAssortment.isPending && <Loading />}
							</DialogButton>
						</VisualisationAction>

						<Separator direction={"vertical"} />

						<VisualisationAction title={"Ręcznie dodaj nowy asortyment"}>
							<Link href={"/centrum-zarzadzania/wizualizacja/asortymenty/nowy"}>
								<Button>
									<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
										{"Dodaj"}
									</Paragraph>
								</Button>
							</Link>
						</VisualisationAction>

						<Separator direction={"vertical"} />

						<VisualisationAction title={"Zeskanuj kod QR"}>
							<DialogButton
								buttonContent={
									<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
										{"Zeskanuj"}
									</Paragraph>
								}
								onClick={() => setQRCodeScannerIsPaused(false)}
							>
								<Flex className={styles["qr-code-scan-container"]} align={"center"} direction={"column"} fullWidth>
									<Paragraph fontSize={1.75}>{"Skanowanie kodu QR"}</Paragraph>

									<Paragraph fontSize={1.25} variant={"secondary"}>
										{
											"Aby automatycznie dodać lub pobrać instancje asortymentu ze stanu magazynu, możesz zeskanować jej kod QR tym miejscu. Wybranie typu operacji będzie możliwe po zeskanowaniu kodu QR."
										}
									</Paragraph>

									<QRCodeScanner isPaused={qrCodeScannerIsPaused} onScan={onQRCodeScan} />

									{qrCodeScannerValue && (
										<>
											<Paragraph variant={"secondary"} fontSize={1.5}>
												{"Wybierz, którą akcję podjąć z zeskanowanym asortymentem:"}
											</Paragraph>

											<Flex direction={"row"} justify={"center"} style={{ gap: "1rem" }} fullWidth>
												<Button
													onClick={() => takeDownAssortmentByQRCodeValue()}
													disabled={
														takeDownOldestAssortmentByDefinition.isPending || putUpAssortmentAutomatically.isPending
													}
												>
													<Paragraph fontSize={1.5}>{"Zdejmij"}</Paragraph>
												</Button>

												<Button
													onClick={() => addNewAssortmentByQRCodeValue()}
													disabled={
														takeDownOldestAssortmentByDefinition.isPending || putUpAssortmentAutomatically.isPending
													}
												>
													<Paragraph fontSize={1.5}>{"Dodaj"}</Paragraph>
												</Button>
											</Flex>
										</>
									)}

									{(takeDownOldestAssortmentByDefinition.isPending || putUpAssortmentAutomatically.isPending) && (
										<Loading />
									)}

									{qrCodeActionError && <FormError>{qrCodeActionError}</FormError>}
								</Flex>
							</DialogButton>
						</VisualisationAction>
					</Flex>

					<Separator />

					<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
						<Paragraph>{"Lista definicji asortymentów"}</Paragraph>

						{allAssortments.isLoading && <Loading />}

						{allAssortments.data && allAssortments.data.length === 0 && (
							<Paragraph fontSize={1.75} variant={"secondary"}>
								{"brak definicji asortymentów!"}
							</Paragraph>
						)}

						<List>
							{allAssortments.data &&
								allAssortments.data.map((assortment, index) => (
									<ListItem clickable={false} key={`assortment-${index}`}>
										<Flex
											direction={"row"}
											align={"center"}
											justify={"space-between"}
											style={{ gap: "1rem" }}
											fullWidth
										>
											<Flex
												direction={"row"}
												align={"center"}
												justify={"center"}
												style={{ height: "100%", gap: "1rem", minWidth: 0 }}
											>
												<Paragraph fontSize={1.5} style={{ minWidth: "10%" }} ellipsisOverflow>
													{assortment.name}
												</Paragraph>

												<Separator direction={"vertical"} style={{ width: "2.5px" }} />

												<Paragraph fontSize={1.25} variant={"secondary"} ellipsisOverflow>
													{assortment.comment}
												</Paragraph>
											</Flex>

											<Link href={`/centrum-zarzadzania/wizualizacja/asortymenty/${assortment.id}/edytuj`}>
												<Button>
													<Paragraph fontSize={1.5}>{"Edytuj"}</Paragraph>
												</Button>
											</Link>
										</Flex>
									</ListItem>
								))}
						</List>
					</Flex>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default AssortmentsVisualisation;
