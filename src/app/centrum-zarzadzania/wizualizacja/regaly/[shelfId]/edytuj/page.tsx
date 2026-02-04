"use client";

import { type FC, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Flex, FullHeight } from "@/ui/atoms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { ShelfForm } from "@/ui/organisms";
import { useAuthData } from "@/ui/providers";

const EditShelf: FC = () => {
	const { authData } = useAuthData();
	const router = useRouter();
	const params = useParams();

	useEffect(() => {
		if (authData && !authData.isAdmin)
			router.push(`/centrum-zarzadzania/wizualizacja/regaly/${params.shelfId}/wyswietl`);
	}, [authData, params.shelfId, router]);

	// Prevents content flashes.
	if (authData && !authData.isAdmin) return null;

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Edytowanie regału"}
					description={"Używając poniższego formularza możesz zmodyfikować dane istniejącego już regału."}
				/>

				<ShelfForm shelfId={params.shelfId as string} />
			</Flex>
		</FullHeight>
	);
};

export default EditShelf;
