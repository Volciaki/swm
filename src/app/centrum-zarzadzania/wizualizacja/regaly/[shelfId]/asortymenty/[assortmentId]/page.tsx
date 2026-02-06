"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FC } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, FullHeight, Link, Loading, Paragraph } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";
import type { DialogButtonHandle } from "@/ui/organisms";
import { AssortmentCard, DialogButton } from "@/ui/organisms";

const ShelfAssortment: FC = () => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();

	const dialogButtonRef = useRef<DialogButtonHandle>(null);
	const [isDialogButtonReady, setIsDialogButtonReady] = useState(false);

	const apiUtils = apiClient.useUtils();
	const assortment = apiClient.storage.getAssortmentInstance.useQuery(
		{ id: params.assortmentId as string },
		{ enabled: params.assortmentId !== undefined }
	);
	const fullShelf = apiClient.storage.getShelf.useQuery(
		{ id: assortment.data?.shelfId as string },
		{ enabled: assortment.data?.shelfId !== undefined }
	);
	const nextAssortmentToBeTakenDown = apiClient.storage.getNextAssortmentToBeTakenDownByDefinition.useQuery(
		{ definitionId: assortment.data?.definition.id ?? "" },
		{ enabled: assortment.data?.definition.id !== undefined }
	);
	const takeDownAssortment = apiClient.storage.takeDownAssortment.useMutation({
		onSuccess: () => {
			apiUtils.storage.getShelf.invalidate();
		},
	});
	const cell = useMemo(() => {
		if (!fullShelf.data || !assortment.data) return;

		return fullShelf.data.cells.flat().find((cell) => cell.id === assortment.data.cellId);
	}, [assortment.data, fullShelf.data]);
	const backURLParameters = cell ? `?x=${cell.x}&y=${cell.y}` : "";

	const takeDownAssortmentHandler = useCallback(async () => {
		if (!assortment.data) return;

		await takeDownAssortment.mutateAsync({ id: assortment.data.id });
		router.push(`/centrum-zarzadzania/wizualizacja/regaly/${assortment.data.shelfId}/asortymenty`);
	}, [assortment.data, takeDownAssortment, router]);

	useEffect(() => {
		if (!isDialogButtonReady) return;

		const akcja = searchParams.get("akcja");

		if (!akcja || akcja !== "zdejmij") return;

		dialogButtonRef.current?.open();
	}, [searchParams, isDialogButtonReady]);

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton
				fallback={`/centrum-zarzadzania/wizualizacja/regaly/${params.shelfId}/asortymenty${backURLParameters}`}
				forceFallback
			/>

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				{assortment.data && nextAssortmentToBeTakenDown.data !== undefined && (
					<>
						<PageHeader
							title={`Asortyment ${assortment.data?.definition.name}`}
							description={"Przeglądaj dane asortymentu lub go zdejmij."}
						/>

						<DialogButton
							buttonContent={<Paragraph fontSize={1.75}>{"Zdejmij"}</Paragraph>}
							ref={dialogButtonRef}
							onMount={() => setIsDialogButtonReady(true)}
						>
							<Paragraph>{"Czy jesteś pewien?"}</Paragraph>

							<Paragraph variant={"secondary"} fontSize={1.5}>
								{"Próbujesz zdjąć asortyment. Ta akcja nie jest odwracalna."}
							</Paragraph>

							{nextAssortmentToBeTakenDown.data.id !== assortment.data.id && (
								<Paragraph fontSize={1.25} variant={"warning"} style={{ textAlign: "center" }}>
									<strong>{"UWAGA!"}</strong>

									{
										" W zasobach magazynu znajduję się instancja tego samego asortymentu, która została przyjęta wcześniej od tej wybranej. O ile pobranie tej przed tamtą nie jest zakazane, zalecane jest sciąganie w pierwszej kolejności najstarszych produktów. Aby znawigować do starszego asortymentu kliknij "
									}

									<Link
										href={`/centrum-zarzadzania/wizualizacja/regaly/${assortment.data.shelfId}/asortymenty/${nextAssortmentToBeTakenDown.data.id}`}
									>
										{"tutaj"}
									</Link>

									{"."}
								</Paragraph>
							)}

							<Button onClick={() => takeDownAssortmentHandler()} disabled={takeDownAssortment.isPending}>
								<Paragraph fontSize={1.5}>{"Zdejmij"}</Paragraph>
							</Button>

							{takeDownAssortment.error && (
								<FormError>{getPolishErrorMessageByMetadata(assortment.error?.data?.metadata)}</FormError>
							)}

							{(takeDownAssortment.isPending || nextAssortmentToBeTakenDown.isLoading) && <Loading />}
						</DialogButton>

						<AssortmentCard assortment={{ ...assortment.data.definition, ...assortment.data }} />
					</>
				)}

				{assortment.error && <FormError>{getPolishErrorMessageByMetadata(assortment.error.data?.metadata)}</FormError>}

				{(assortment.isLoading || nextAssortmentToBeTakenDown.isLoading) && <Loading />}
			</Flex>
		</FullHeight>
	);
};

export default ShelfAssortment;
