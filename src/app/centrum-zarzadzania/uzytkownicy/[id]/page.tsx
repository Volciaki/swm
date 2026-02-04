"use client";

import { useParams } from "next/navigation";
import { UserForm } from "@/ui/organisms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Flex, FullHeight, Paragraph, Loading } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

const UsersExisting = () => {
	const params = useParams();
	const user = apiClient.identity.getUserById.useQuery(
		{ id: params.id as string },
		{ enabled: params.id !== undefined }
	);

	return (
		<FullHeight>
			<BackButton fallback={"/centrum-zarzadzania/uzytkownicy"} />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Edytuj użytkownika"}
					description={"Używając poniższego formularza możesz edytować istniejącego już użytkownika."}
				/>

				{user.data && <UserForm userData={{ ...user.data, password: "" }} />}

				{user.isLoading && <Loading />}

				{user.isError && user.error.data?.metadata && (
					<Paragraph variant={"danger"}>{`${getPolishErrorMessageByMetadata(user.error.data?.metadata)}`}</Paragraph>
				)}
			</Flex>
		</FullHeight>
	);
};

export default UsersExisting;
