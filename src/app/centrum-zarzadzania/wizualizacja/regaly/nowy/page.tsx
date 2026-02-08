"use client";

import { useEffect, type FC } from "react";
import { useRouter } from "next/navigation";
import { ShelfForm } from "@/ui/organisms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Flex, FullHeight } from "@/ui/atoms";
import { useAuthData } from "@/ui/providers";
import { useMobile } from "@/ui/hooks";

const NewShelf: FC = () => {
	const router = useRouter();
	const { authData } = useAuthData();
	const { mobile } = useMobile();

	useEffect(() => {
		if (authData && !authData.isAdmin) router.push("/centrum-zarzadzania/wizualizacja/");
	}, [authData, router]);

	if (authData && !authData.isAdmin) return null;

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja"} />

			<Flex
				direction={"column"}
				align={"center"}
				style={{ gap: "1rem", marginTop: mobile ? "1rem" : undefined }}
				fullWidth
			>
				<PageHeader
					title={"Dodawanie regału"}
					description={"Używając poniższego formularza możesz dodać nowy regał."}
				/>

				<ShelfForm />
			</Flex>
		</FullHeight>
	);
};

export default NewShelf;
