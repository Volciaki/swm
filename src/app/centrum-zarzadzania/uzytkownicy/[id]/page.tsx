"use client";

import { useParams } from "next/navigation";
import { UserForm } from "@/ui/organisms";
import { PageHeader } from "@/ui/molecules";
import { Button, Flex, FullHeight, Paragraph, Separator, Link, Loading } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";

const UsersExisting = () => {
	const params = useParams();
	const user = apiClient.identity.getUser.useQuery({ id: params.id as string }, { enabled: params.id !== undefined });

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader
					title={"Edytuj użytkownika"}
					description={"Używając poniższego formularza możesz zedytować istniejącego już użytkownika."}
				/>

				<Flex direction={"column"} align={"center"} style={{ gap: "1rem", width: "75%" }}>
					{user.data && <UserForm data={{ ...user.data, password: "" }} existing />}

					{user.isLoading && <Loading />}

					{user.isError && user.error.data?.metadata && (
						<Paragraph variant={"danger"}>{`${getPolishErrorMessageByMetadata(user.error.data?.metadata)}`}</Paragraph>
					)}

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
};

export default UsersExisting;
