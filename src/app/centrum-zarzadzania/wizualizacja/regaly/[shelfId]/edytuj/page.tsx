"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { Flex, FullHeight } from "@/ui/atoms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { ShelfForm } from "@/ui/organisms";

const EditShelf: FC = () => {
	const params = useParams();

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja"} />

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
