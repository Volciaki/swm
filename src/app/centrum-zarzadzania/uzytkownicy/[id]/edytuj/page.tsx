"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserForm } from "@/ui/organisms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Flex, FullHeight, Paragraph, Loading } from "@/ui/atoms";
import { apiClient, useAuthData } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

const EditUser = () => {
	const { authData } = useAuthData();
	const router = useRouter();
	const params = useParams();
	const user = apiClient.identity.getUserById.useQuery(
		{ id: params.id as string },
		{ enabled: params.id !== undefined }
	);
	const notAuthorizedToViewPage = authData && user.data && !authData.isAdmin && user.data.id !== authData.id;

	useEffect(() => {
		if (notAuthorizedToViewPage) router.push(`/centrum-zarzadzania/uzytkownicy/${params.id}/wyswietl`);
	}, [notAuthorizedToViewPage, router, params.id]);

	if (notAuthorizedToViewPage) return null;

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

export default EditUser;
