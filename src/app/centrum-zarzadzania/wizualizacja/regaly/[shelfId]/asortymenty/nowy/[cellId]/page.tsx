"use client";

import { useCallback, useEffect, useState, type FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { BackButton, List, ListItem, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, FullHeight, Loading, Paragraph, Separator } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler, getPolishErrorMessageByMetadata } from "@/ui/utils";
import { useMobile } from "@/ui/hooks";

const PutUpAssortment: FC = () => {
	const { mobile } = useMobile();
	const router = useRouter();
	const params = useParams();

	const apiUtils = apiClient.useUtils();
	const getShelf = apiClient.storage.getShelf.useQuery(
		{ id: params.shelfId as string },
		{ enabled: params.shelfId !== undefined }
	);
	const getAllAssortments = apiClient.storage.getAllAssortments.useQuery();
	const putUpAssortment = apiClient.storage.putUpAssortment.useMutation({
		onSuccess: (data) => {
			setPutUpAssortmentError(undefined);
			apiUtils.storage.invalidate();
			redirectToCreated(data.newAssortment.shelfId, data.newAssortment.id);
		},
		onError: (e) => defaultErrorHandler(e, (message) => setPutUpAssortmentError(message)),
	});
	const [putUpAssortmentError, setPutUpAssortmentError] = useState<string | undefined>();

	const thisCell = getShelf.data ? getShelf.data.cells.flat().find((cell) => cell.id === params.cellId) : undefined;
	const backURLParameters = thisCell ? `?x=${thisCell.x}&y=${thisCell.y}` : "";

	const redirectToCreated = useCallback(
		(shelfId: string, assortmentId: string) => {
			router.push(`/centrum-zarzadzania/wizualizacja/regaly/${shelfId}/asortymenty/${assortmentId}`);
		},
		[router]
	);

	const putUpAssortmentHandler = useCallback(
		async (assortmentDefinitionId: string) => {
			const { shelfId, cellId } = params;

			if (!shelfId || !cellId) return;

			putUpAssortment.mutate({
				shelfId: shelfId as string,
				cellId: cellId as string,
				assortmentDefinitionId,
			});
		},
		[params, putUpAssortment]
	);

	useEffect(() => {
		if (thisCell && thisCell.assortment !== null) redirectToCreated(thisCell.shelfId, thisCell.assortment.id);
	}, [thisCell, redirectToCreated]);

	if (getShelf.isLoading || thisCell?.assortment) return <Loading />;

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton
				fallback={`/centrum-zarzadzania/wizualizacja/regaly/${params.shelfId}/asortymenty${backURLParameters}`}
				forceFallback
			/>

			<Flex
				direction={"column"}
				align={"center"}
				style={{ gap: "1rem", marginTop: mobile ? "1rem" : undefined }}
				fullWidth
			>
				<PageHeader
					title={"Wypełnij pole asortymentem"}
					description={"W celu wypełnienia pola wybierz definicje asortymentu z poniższej listy."}
				/>

				{putUpAssortment.isPending && <Loading />}

				{putUpAssortmentError && !putUpAssortment.isPending && <FormError>{putUpAssortmentError}</FormError>}

				{getAllAssortments.isLoading && <Loading />}

				{getAllAssortments.error && (
					<FormError>{getPolishErrorMessageByMetadata(getAllAssortments.error.data?.metadata)}</FormError>
				)}

				{getAllAssortments.data && getAllAssortments.data.length === 0 && (
					<Paragraph fontSize={mobile ? 1.5 : 1.75} variant={"secondary"}>
						{"brak definicji!"}
					</Paragraph>
				)}

				{getAllAssortments.data && (
					<List>
						{getAllAssortments.data
							.sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
							.map((definition, index) => (
								<ListItem key={`definition-${index}`}>
									<Flex
										direction={"row"}
										align={"center"}
										justify={"space-between"}
										style={{ gap: mobile ? "1rem" : undefined }}
										fullWidth
									>
										<Flex
											direction={mobile ? "column" : "row"}
											align={"center"}
											justify={"center"}
											style={{
												width: "fit-content",
												height: "100%",
												gap: mobile ? "0.5rem" : "1rem",
												minWidth: 0,
												maxWidth: "100%",
											}}
										>
											<Paragraph
												fontSize={mobile ? 1.25 : 1.5}
												style={{
													maxWidth: mobile ? "100%" : undefined,
													textAlign: "start",
													width: mobile ? "100%" : undefined,
												}}
												ellipsisOverflow
											>
												{definition.name}
											</Paragraph>

											<Separator direction={mobile ? "horizontal" : "vertical"} style={{ width: "2.5px" }} />

											<Paragraph
												fontSize={mobile ? 1 : 1.25}
												variant={"secondary"}
												style={{
													maxWidth: mobile ? "100%" : undefined,
													textAlign: "start",
													width: mobile ? "100%" : undefined,
												}}
												ellipsisOverflow
											>
												{definition.comment}
											</Paragraph>
										</Flex>

										<Button onClick={() => putUpAssortmentHandler(definition.id)} disabled={putUpAssortment.isPending}>
											<Paragraph fontSize={mobile ? 1.25 : 1.5}>{"Wybierz"}</Paragraph>
										</Button>
									</Flex>
								</ListItem>
							))}
					</List>
				)}
			</Flex>
		</FullHeight>
	);
};

export default PutUpAssortment;
