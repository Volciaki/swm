"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { BackButton, PageHeader } from "@/ui/molecules";
import { FullHeight, Flex, FormError, Loading } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";
import { UserCard } from "@/ui/organisms/UserCard";

const ViewUser: FC = () => {
	const params = useParams();
	const getUser = apiClient.identity.getUserById.useQuery(
		{ id: (params?.id as string) ?? "" },
		{ enabled: params?.id !== undefined }
	);

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/uzytkownicy"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				{getUser.data && (
					<>
						<PageHeader title={`Użytkownik ${getUser.data.name}`} description={"Przeglądaj dane użytkownika."} />

						<UserCard user={getUser.data} />
					</>
				)}

				{getUser.error && <FormError>{defaultErrorHandler(getUser.error, (message) => message)}</FormError>}

				{getUser.isLoading && <Loading />}
			</Flex>
		</FullHeight>
	);
};

export default ViewUser;
