"use client";

import { useEffect, type FC } from "react";
import { useParams, useRouter } from "next/navigation";
import { AssortmentForm } from "@/ui/organisms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Flex, FullHeight } from "@/ui/atoms";
import { useAuthData } from "@/ui/providers";

const NewAssortment: FC = () => {
	const { authData } = useAuthData();
	const router = useRouter();
	const params = useParams();

	useEffect(() => {
		if (authData && !authData.isAdmin) router.push("/centrum-zarzadzania/wizualizacja/asortymenty");
	}, [authData, params.assortmentId, router]);

	if (authData && !authData.isAdmin) return null;

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja/asortymenty"} />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Dodaj nowy asortyment"}
					description={"Użyj formularza poniżej, aby dodać nowy asortyment."}
				/>

				<AssortmentForm />
			</Flex>
		</FullHeight>
	);
};

export default NewAssortment;
