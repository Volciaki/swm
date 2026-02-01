"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/ui/molecules";
import { Flex, FullHeight } from "@/ui/atoms";
import { AssortmentForm } from "@/ui/organisms";

const NewAssortment: FC = () => {
	const params = useParams();

	return (
		<FullHeight style={{ width: "100%" }}>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Wypełnij pole asortymentem"}
					description={"Wypełnij formularz poniżej aby dodać nowy asortyment."}
				/>

				<AssortmentForm shelfId={params.shelfId as string} cellId={params.cellId as string} />
			</Flex>
		</FullHeight>
	);
};

export default NewAssortment;
