"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/ui/molecules";
import { Flex, FullHeight } from "@/ui/atoms";

const ReplaceAssortment: FC = () => {
	const params = useParams();

	return (
		<FullHeight style={{ width: "100%" }}>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Zmień asortyment"}
					description={
						"Wybierz nowy asortyment z listy aby zamienić ten obecny, lub pobierz asortyment aby opróżnić pole."
					}
				/>
			</Flex>
		</FullHeight>
	);
};

export default ReplaceAssortment;
