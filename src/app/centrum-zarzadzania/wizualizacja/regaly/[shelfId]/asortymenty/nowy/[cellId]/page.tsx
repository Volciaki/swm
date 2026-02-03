"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/ui/molecules";
import { Flex, FullHeight } from "@/ui/atoms";

const PutUpAssortment: FC = () => {
	const params = useParams();

	return (
		<FullHeight style={{ width: "100%" }}>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Wypełnij pole asortymentem"}
					description={"W celu wypełnienia pola wybierz definicje asortymentu z poniższej listy."}
				/>
			</Flex>
		</FullHeight>
	);
};

export default PutUpAssortment;
