"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { AssortmentForm } from "@/ui/organisms";
import { PageHeader } from "@/ui/molecules";
import { FullHeight, Flex } from "@/ui/atoms";

const EditAssortment: FC = () => {
	const params = useParams();

	return (
		<FullHeight style={{ width: "100%" }}>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader title={"Edytuj asortyment"} description={"Usuń asortyment lub zmień jego parametry."} />

				<AssortmentForm definitionId={params.assortmentId as string} />
			</Flex>
		</FullHeight>
	);
};

export default EditAssortment;
