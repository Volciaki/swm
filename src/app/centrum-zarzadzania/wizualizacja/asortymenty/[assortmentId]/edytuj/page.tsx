"use client";

import { type FC, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AssortmentForm } from "@/ui/organisms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { FullHeight, Flex } from "@/ui/atoms";
import { useAuthData } from "@/ui/providers";

const EditAssortment: FC = () => {
	const { authData } = useAuthData();
	const router = useRouter();
	const params = useParams();

	useEffect(() => {
		if (authData && !authData.isAdmin)
			router.push(`/centrum-zarzadzania/wizualizacja/asortymenty/${params.assortmentId}/wyswietl`);
	}, [authData, params.assortmentId, router]);

	if (authData && !authData.isAdmin) return null;

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja/asortymenty"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader title={"Edytuj asortyment"} description={"Usuń asortyment lub zmień jego parametry."} />

				<AssortmentForm definitionId={params.assortmentId as string} />
			</Flex>
		</FullHeight>
	);
};

export default EditAssortment;
