"use client";

import { useParams } from "next/navigation";
import { UserForm } from "@/ui/organisms";
import { PageHeader } from "@/ui/molecules";
import { Button, Flex, FullHeight, Paragraph, Separator, Link } from "@/ui/atoms";

const UsersExisting = () => {
	const params = useParams();

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
				<PageHeader
					title={"Edytuj użytkownika"}
					description={"Używając poniższego formularza możesz zedytować istniejącego już użytkownika."}
				/>

				<UserForm existing />

				<Separator />

				<Link href={"/centrum-zarzadzania/uzytkownicy"}>
					<Button>
						<Paragraph variant={"secondary"} style={{ marginInline: "20px" }}>
							{"Powrót"}
						</Paragraph>
					</Button>
				</Link>
			</Flex>
		</FullHeight>
	);
};

export default UsersExisting;
