import { type FC } from "react";
import { Flex, FullHeight } from "@/ui/atoms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { ShelfForm } from "@/ui/organisms";

const NewShelf: FC = () => (
	<FullHeight style={{ width: "100%" }}>
		<BackButton fallback={"/centrum-zarzadzania/wizualizacja"} />

		<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
			<PageHeader title={"Dodawanie regału"} description={"Używając poniższego formularza możesz dodać nowy regał."} />

			<ShelfForm />
		</Flex>
	</FullHeight>
);

export default NewShelf;
