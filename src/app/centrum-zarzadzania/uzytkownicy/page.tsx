"use client";

import { type FC } from "react";
import { Button, Flex, FullHeight, Paragraph, Link, Separator, Loading } from "@/ui/atoms";
import { PageHeader, List, BackButton } from "@/ui/molecules";
import { apiClient, useAuthData } from "@/ui/providers";
import { UserListItem } from "@/ui/organisms";
import { useMobile } from "@/ui/hooks";

const Users: FC = () => {
	const { authData } = useAuthData();
	const { mobile } = useMobile();
	const users = apiClient.identity.listUsers.useQuery();

	return (
		<FullHeight>
			<BackButton fallback={"/centrum-zarzadzania"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem", marginTop: mobile ? "1rem" : undefined }}>
				<PageHeader
					title={authData?.isAdmin ? "Zarządzanie użytkownikami" : "Użytkownicy"}
					description={
						authData?.isAdmin
							? "Na tej stronie możesz dodawać, usuwać lub modyfikować użytkowników według własnych preferencji."
							: "Na tej stronie możesz przeglądać dane użytkowników, oraz edytować swoje."
					}
				/>

				{authData?.isAdmin && (
					<Link href={"/centrum-zarzadzania/uzytkownicy/nowy"} style={{ width: mobile ? "100%" : undefined }}>
						<Button style={{ width: mobile ? "100%" : undefined }}>
							<Paragraph fontSize={mobile ? 1.25 : 1.5} style={{ marginInline: mobile ? undefined : "20px" }}>
								{"Dodaj nowego użytkownika"}
							</Paragraph>
						</Button>
					</Link>
				)}

				<Flex direction={"column"} align={"center"} style={{ width: mobile ? "100%" : "75%", gap: "1rem" }}>
					<Separator />

					{users.isLoading && <Loading />}

					<List>
						{users.data &&
							users.data
								.sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
								.map((user, index) => (
									<Link
										href={`uzytkownicy/${user.id}/${user.id === authData?.id ? "edytuj" : authData?.isAdmin ? "edytuj" : "wyswietl"}`}
										key={`user-${index}`}
										style={{ textDecoration: "none" }}
									>
										<UserListItem user={user} />
									</Link>
								))}
					</List>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Users;
