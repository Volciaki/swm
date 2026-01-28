import { type FC } from "react";
import { UserForm } from "@/ui/organisms";
import { PageHeader } from "@/ui/molecules";
import { FullHeight, Flex } from "@/ui/atoms";

const UsersNew: FC = () => (
	<FullHeight>
		<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
			<PageHeader
				title={"Dodaj użytkownika"}
				description={"Używając poniższego formularza możesz dodać nowego użytkownika."}
			/>

			<UserForm />
		</Flex>
	</FullHeight>
);

export default UsersNew;
