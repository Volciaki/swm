"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { AssortmentForm } from "@/ui/organisms";
import { PageHeader } from "@/ui/molecules";
import { Flex, FullHeight } from "@/ui/atoms";

const EditAssortment: FC = () => {
	const params = useParams();

	return (
		<FullHeight style={{ width: "100%" }}>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader title={"Edytuj asortyment"} description={"W celu edycji asortymentu użyj formluarza poniżej."} />

				<AssortmentForm
					shelfId={params.shelfId as string}
					cellId={params.cellId as string}
					assortmentId={params.assortmentId as string}
				/>
			</Flex>
		</FullHeight>
	);
};

export default EditAssortment;
