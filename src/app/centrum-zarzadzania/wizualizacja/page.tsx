"use client";

import Papa from "papaparse";
import { useCallback, useState, type FC } from "react";
import { DialogButton, StandardFileUpload, VisualisationAction } from "@/ui/organisms";
import { BackButton, List, ListItem, PageHeader } from "@/ui/molecules";
import { Button, Flex, FullHeight, Loading, Paragraph, Separator, Link, FormError } from "@/ui/atoms";
import { apiClient, useAuthData } from "@/ui/providers";
import commonStyles from "@/styles/common.module.scss";
import { defaultErrorHandler } from "@/ui/utils";

type CSVShelf = {
	Oznaczenie: string;
	M: number;
	N: number;
	TempMin: number;
	TempMax: number;
	MaxWagaKg: number;
	MaxSzerokoscMm: number;
	MaxWysokoscMm: number;
	MaxGlebokoscMm: number;
	Komentarz: string;
};

const Visualisation: FC = () => {
	const { authData } = useAuthData();
	const apiUtils = apiClient.useUtils();
	const importShelves = apiClient.storage.importShelves.useMutation({
		onError: (e) => defaultErrorHandler(e, (message) => setImportShelvesError(message)),
		onSuccess: () => {
			apiUtils.storage.invalidate();
		},
	});
	const shelves = apiClient.storage.getAllShelves.useQuery();
	const [fileUploadError, setFileUploadError] = useState<string | undefined>();
	const [file, setFile] = useState<File | undefined>();
	const [importShelvesError, setImportShelvesError] = useState<string | undefined>();

	const importShelvesSubmitHandler = useCallback(async () => {
		if (!file) return;

		const text = await file.text();
		const result = Papa.parse<CSVShelf>(text, {
			header: true,
			skipEmptyLines: true,
			delimiter: ";",
			dynamicTyping: {
				M: true,
				N: true,
				TempMin: true,
				TempMax: true,
				MaxWagaKg: true,
				MaxSzerokoscMm: true,
				MaxWysokoscMm: true,
				MaxGlebokoscMm: true,
			},
		});

		let shelves;
		try {
			// Each item of this `parsed` array is either an error message string, or a Shelf object.
			const parsed = result.data.map((row) => {
				const generateErrorMessage = (msg: string) => `Plik CSV nie określa ${msg} każdego regału.`;

				if (!row.M) return generateErrorMessage("ilości rzędów (M)");
				if (!row.N) return generateErrorMessage("ilości kolumn (N)");
				if (!row.Komentarz)
					return `${generateErrorMessage("komentarza")} Dla przejrzystości, wymagane jest jego dodanie.`;
				if (!row.MaxWagaKg) return generateErrorMessage("maksymalnej wagi");
				if (!row.Oznaczenie) return generateErrorMessage("oznaczenia");
				if (!row.TempMax) return generateErrorMessage("maksymalnej temperatury");
				if (!row.TempMin) return generateErrorMessage("minimalnej temperatury");
				if (!row.MaxWysokoscMm) return generateErrorMessage("maksymalnej wysokości asortymentu");
				if (!row.MaxGlebokoscMm) return generateErrorMessage("maksymalnej długości asortymentu");
				if (!row.MaxSzerokoscMm) return generateErrorMessage("maksymalnej szerokości asortymentu");

				return {
					cellsShape: {
						rows: row.M,
						columns: row.N,
					},
					comment: row.Komentarz,
					maxWeightKg: row.MaxWagaKg,
					name: row.Oznaczenie,
					temperatureRange: {
						maximalCelsius: row.TempMax,
						minimalCelsius: row.TempMin,
					},
					maxAssortmentSize: {
						heightMillimeters: row.MaxWysokoscMm,
						lengthMillimeters: row.MaxGlebokoscMm,
						widthMillimeters: row.MaxSzerokoscMm,
					},
					supportsHazardous: true,
				};
			});
			shelves = parsed.map((value) => {
				if (typeof value === "string") throw new Error(value);

				return value;
			});
		} catch (error) {
			setImportShelvesError((error as Error).message);
			return;
		}

		importShelves.mutate({ shelves });
	}, [file, importShelves, setImportShelvesError]);

	return (
		<FullHeight>
			<BackButton fallback={"/centrum-zarzadzania"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Wizualizacja magazynu"}
					description={
						"Przeglądaj, twórz i edytuj regały. Istnieje również możliwość importowania regałów z pliku CSV."
					}
				/>

				<Flex direction={"column"} className={commonStyles["form-container"]} fullWidth>
					<Flex direction={"row"} fullWidth>
						{authData?.isAdmin && (
							<>
								<VisualisationAction title={"Importuj regały z pliku CSV"}>
									<DialogButton
										buttonContent={
											<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
												{"Importuj"}
											</Paragraph>
										}
									>
										<Paragraph fontSize={1.5}>
											{"Przesuń plik na pole poniżej lub klknij w nie aby wybrać plik"}
										</Paragraph>

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

										<Button onClick={() => importShelvesSubmitHandler()} disabled={!file || importShelves.isPending}>
											<Paragraph fontSize={1.75}>{"Importuj"}</Paragraph>
										</Button>

										{importShelvesError && <FormError>{importShelvesError}</FormError>}

										{importShelves.isPending && <Loading />}
									</DialogButton>
								</VisualisationAction>

								<Separator direction={"vertical"} />

								<VisualisationAction title={"Ręcznie dodaj nowy regał"}>
									<Link href={"/centrum-zarzadzania/wizualizacja/regaly/nowy"}>
										<Button>
											<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
												{"Dodaj"}
											</Paragraph>
										</Button>
									</Link>
								</VisualisationAction>

								<Separator direction={"vertical"} />
							</>
						)}

						<VisualisationAction title={"Zobacz zdefiniowane asortymenty"}>
							<Link href={"/centrum-zarzadzania/wizualizacja/asortymenty"}>
								<Button>
									<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
										{"Asortymenty"}
									</Paragraph>
								</Button>
							</Link>
						</VisualisationAction>
					</Flex>

					<Separator />

					<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
						<Paragraph>{"Lista regałów"}</Paragraph>

						{shelves.isLoading && <Loading />}

						{shelves.data && shelves.data.length === 0 && (
							<Paragraph fontSize={1.75} variant={"secondary"}>
								{"brak regałów!"}
							</Paragraph>
						)}

						<List>
							{shelves.data &&
								shelves.data
									.sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
									.map((shelf, index) => (
										<ListItem clickable={false} key={`shelf-${index}`}>
											<Flex direction={"row"} align={"center"} justify={"space-between"} fullWidth>
												<Flex
													direction={"row"}
													align={"center"}
													justify={"center"}
													style={{ width: "fit-content", height: "100%", gap: "1rem" }}
												>
													<Paragraph fontSize={1.5} ellipsisOverflow>
														{shelf.name}
													</Paragraph>

													<Separator direction={"vertical"} style={{ width: "2.5px" }} />

													<Paragraph fontSize={1.25} variant={"secondary"} ellipsisOverflow>
														{shelf.comment}
													</Paragraph>
												</Flex>

												<Flex direction={"row"} align={"center"} style={{ gap: "1rem" }}>
													{authData?.isAdmin ? (
														<Link href={`/centrum-zarzadzania/wizualizacja/regaly/${shelf.id}/edytuj`}>
															<Button>
																<Paragraph fontSize={1.5}>{"Edytuj"}</Paragraph>
															</Button>
														</Link>
													) : (
														<Link href={`/centrum-zarzadzania/wizualizacja/regaly/${shelf.id}/wyswietl`}>
															<Button>
																<Paragraph fontSize={1.5}>{"Wyświetl"}</Paragraph>
															</Button>
														</Link>
													)}

													<Link href={`/centrum-zarzadzania/wizualizacja/regaly/${shelf.id}/asortymenty`}>
														<Button>
															<Paragraph fontSize={1.5}>{"Asortyment"}</Paragraph>
														</Button>
													</Link>
												</Flex>
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

export default Visualisation;
