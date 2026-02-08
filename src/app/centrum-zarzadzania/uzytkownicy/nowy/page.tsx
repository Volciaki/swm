"use client";

import { type FC } from "react";
import { UserForm } from "@/ui/organisms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { FullHeight, Flex } from "@/ui/atoms";
import { useMobile } from "@/ui/hooks";

const UsersNew: FC = () => {
	const { mobile } = useMobile();

	return (
		<FullHeight>
			<BackButton fallback={"/centrum-zarzadzania/uzytkownicy"} />

			<Flex
				direction={"column"}
				align={"center"}
				style={{ gap: "1rem", marginTop: mobile ? "1rem" : undefined }}
				fullWidth
			>
				<PageHeader
					title={"Dodaj użytkownika"}
					description={"Używając poniższego formularza możesz dodać nowego użytkownika."}
				/>

				<UserForm />
			</Flex>
		</FullHeight>
	);
};

export default UsersNew;
