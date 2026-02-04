"use client";

import { useCallback, type FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Button, Flex, FormError, FullHeight, Loading, Paragraph } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";
import { AssortmentCard, DialogButton } from "@/ui/organisms";

const Assortment: FC = () => {
	const router = useRouter();
	const params = useParams();

	const apiUtils = apiClient.useUtils();
	const assortment = apiClient.storage.getAssortmentInstance.useQuery(
		{ id: params.assortmentId as string },
		{ enabled: params.assortmentId !== undefined }
	);
	const takeDownAssortment = apiClient.storage.takeDownAssortment.useMutation({
		onSuccess: () => {
			apiUtils.storage.getShelf.invalidate();
		},
	});

	const takeDownAssortmentHandler = useCallback(async () => {
		if (!assortment.data) return;

		await takeDownAssortment.mutateAsync({ id: assortment.data.id });
		router.push(`/centrum-zarzadzania/wizualizacja/regaly/${assortment.data.shelfId}/wyswietl`);
	}, [assortment.data, takeDownAssortment, router]);

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={`/centrum-zarzadzania/wizualizacja/regaly/${params.shelfId}/wyswietl`} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				{assortment.data && (
					<>
						<PageHeader
							title={`Asortyment ${assortment.data?.definition.name}`}
							description={"Przeglądaj dane asortymentu lub go zdejmij."}
						/>

						<DialogButton buttonContent={<Paragraph fontSize={1.75}>{"Zdejmij"}</Paragraph>}>
							<Paragraph>{"Czy jesteś pewien?"}</Paragraph>

							<Paragraph variant={"secondary"} fontSize={1.5}>
								{"Próbujesz zdjąć asortyment. Ta akcja nie jest odwracalna."}
							</Paragraph>

							<Button onClick={() => takeDownAssortmentHandler()} disabled={takeDownAssortment.isPending}>
								<Paragraph fontSize={1.5}>{"Zdejmij"}</Paragraph>
							</Button>

							{takeDownAssortment.error && (
								<FormError>{getPolishErrorMessageByMetadata(assortment.error?.data?.metadata)}</FormError>
							)}

							{takeDownAssortment.isPending && <Loading />}
						</DialogButton>

						<AssortmentCard assortment={assortment.data} />
					</>
				)}

				{assortment.error && <FormError>{getPolishErrorMessageByMetadata(assortment.error.data?.metadata)}</FormError>}

				{assortment.isLoading && <Loading />}
			</Flex>
		</FullHeight>
	);
};

export default Assortment;
