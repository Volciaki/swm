"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { Flex, FormError, FullHeight, Loading } from "@/ui/atoms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { ShelfCard } from "@/ui/organisms";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";

const ViewShelf: FC = () => {
	const params = useParams();

	const getShelf = apiClient.storage.getShelf.useQuery(
		{ id: params.shelfId as string },
		{ enabled: params.shelfId !== undefined }
	);

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				{getShelf.data && (
					<>
						<PageHeader title={`Regał ${getShelf.data.name}`} description={"Przeglądaj dane regału."} />

						<ShelfCard shelf={getShelf.data} />
					</>
				)}

				{getShelf.error && <FormError>{defaultErrorHandler(getShelf.error, (message) => message)}</FormError>}

				{getShelf.isLoading && <Loading />}
			</Flex>
		</FullHeight>
	);
};

export default ViewShelf;
