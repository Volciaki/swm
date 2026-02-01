import { type FC } from "react";
import { Flex, FullHeight } from "@/ui/atoms";
import { PageHeader } from "@/ui/molecules";
import { ShelfForm } from "@/ui/organisms";

const NewShelf: FC = () => (
	<FullHeight style={{ width: "100%" }}>
		<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
			<PageHeader title={"Dodawanie regału"} description={"Używając poniższego formularza możesz dodać nowy regał."} />

			<ShelfForm />
		</Flex>
	</FullHeight>
);

export default NewShelf;
