"use client";

import { useCallback, useEffect, type FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { BackButton, List, ListItem, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, FullHeight, Loading, Paragraph, Separator } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

const PutUpAssortment: FC = () => {
	const router = useRouter();
	const params = useParams();

	const apiUtils = apiClient.useUtils();
	const getShelf = apiClient.storage.getShelf.useQuery(
		{ id: params.shelfId as string },
		{ enabled: params.shelfId !== undefined }
	);
	const getAllAssortments = apiClient.storage.getAllAssortments.useQuery();
	const putUpAssortment = apiClient.storage.putUpAssortment.useMutation({
		onSuccess: () => {
			apiUtils.storage.invalidate();
		},
	});

	const thisCell = getShelf.data ? getShelf.data.cells.flat().find((cell) => cell.id === params.cellId) : undefined;

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

			const data = await putUpAssortment.mutateAsync({
				shelfId: shelfId as string,
				cellId: cellId as string,
				assortmentDefinitionId,
			});
			redirectToCreated(data.newAssortment.shelfId, data.newAssortment.id);
		},
		[params, putUpAssortment, redirectToCreated]
	);

	useEffect(() => {
		if (thisCell && thisCell.assortment !== null) redirectToCreated(thisCell.shelfId, thisCell.assortment.id);
	}, [thisCell, redirectToCreated]);

	if (getShelf.isLoading || thisCell?.assortment) return <Loading />;

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={`/centrum-zarzadzania/wizualizacja/regaly/${params.shelfId}`} />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Wypełnij pole asortymentem"}
					description={"W celu wypełnienia pola wybierz definicje asortymentu z poniższej listy."}
				/>

				{putUpAssortment.isPending && <Loading />}

				{putUpAssortment.error && (
					<FormError>{getPolishErrorMessageByMetadata(putUpAssortment.error.data?.metadata)}</FormError>
				)}

				{getAllAssortments.isLoading && <Loading />}

				{getAllAssortments.error && (
					<FormError>{getPolishErrorMessageByMetadata(getAllAssortments.error.data?.metadata)}</FormError>
				)}

				{getAllAssortments.data && (
					<List>
						{getAllAssortments.data.map((definition, index) => (
							<ListItem key={`definition-${index}`}>
								<Flex direction={"row"} align={"center"} justify={"space-between"} fullWidth>
									<Flex
										direction={"row"}
										align={"center"}
										justify={"center"}
										style={{ width: "fit-content", height: "100%", gap: "1rem", minWidth: 0 }}
									>
										<Paragraph fontSize={1.5} ellipsisOverflow>
											{definition.name}
										</Paragraph>

										<Separator direction={"vertical"} style={{ width: "2.5px" }} />

										<Paragraph fontSize={1.25} variant={"secondary"} ellipsisOverflow>
											{definition.comment}
										</Paragraph>
									</Flex>

									<Button onClick={() => putUpAssortmentHandler(definition.id)} disabled={putUpAssortment.isPending}>
										<Paragraph fontSize={1.5}>{"Wybierz"}</Paragraph>
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
