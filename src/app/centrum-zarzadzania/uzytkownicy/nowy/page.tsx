import { type FC } from "react";
import { UserForm } from "@/ui/organisms";
import { PageHeader } from "@/ui/molecules";
import { FullHeight, Flex, Separator, Button, Paragraph, Link } from "@/ui/atoms";

const UsersNew: FC = () => (
	<FullHeight>
		<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
			<PageHeader
				title={"Dodaj użytkownika"}
				description={"Używając poniższego formularza możesz dodać nowego użytkownika."}
			/>

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem", width: "75%" }}>
				<UserForm />

				<Separator />

				<Link href={"/centrum-zarzadzania/uzytkownicy"}>
					<Button>
						<Paragraph style={{ marginInline: "20px" }}>{"Powrót"}</Paragraph>
					</Button>
				</Link>
			</Flex>
		</Flex>
	</FullHeight>
);

export default UsersNew;
