"use client";

import { type FC } from "react";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Flex, FullHeight } from "@/ui/atoms";
import { AssortmentForm } from "@/ui/organisms";

const NewAssortment: FC = () => (
	<FullHeight style={{ width: "100%" }}>
		<BackButton fallback={"/centrum-zarzadzania/wizualizacja/asortymenty"} />

		<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
			<PageHeader title={"Dodaj nowy asortyment"} description={"Użyj formularza poniżej, aby dodać nowy asortyment."} />

			<AssortmentForm />
		</Flex>
	</FullHeight>
);

export default NewAssortment;
