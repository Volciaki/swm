"use client";

import { type FC } from "react";
import { Button, Flex, FullHeight, Paragraph, Link, Separator, Loading } from "@/ui/atoms";
import { PageHeader, List } from "@/ui/molecules";
import { apiClient } from "@/ui/providers";
import { UserCard } from "@/ui/organisms";

const Users: FC = () => {
	const users = apiClient.identity.listUsers.useQuery();

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
				<PageHeader
					title={"Zarządzanie użytkownikami"}
					description={
						"Na tej stronie możesz dodawać, usuwać lub modyfikować użytkowników według własnych preferencji."
					}
				/>

				<Link href={"uzytkownicy/nowy"}>
					<Button>
						<Paragraph fontSize={1.5} style={{ marginInline: "20px" }}>
							{"Dodaj nowego użytkownika"}
						</Paragraph>
					</Button>
				</Link>

				<Flex direction={"column"} align={"center"} style={{ width: "75%", gap: "1rem" }}>
					<Separator />

					{users.isLoading && <Loading />}

					<List>
						{users.data &&
							users.data.map((user, index) => (
								<Link href={`uzytkownicy/${user.id}`} key={`user-${index}`} style={{ textDecoration: "none" }}>
									<UserCard user={user} />
								</Link>
							))}
					</List>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Users;
