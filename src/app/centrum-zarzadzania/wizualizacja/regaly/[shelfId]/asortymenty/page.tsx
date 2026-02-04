"use client";

import type { FC } from "react";
import { useParams } from "next/navigation";
import { FullHeight, Flex, Loading, FormError } from "@/ui/atoms";
import { BackButton, PageHeader, Shelf } from "@/ui/molecules";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";
import styles from "@/styles/view-shelf.module.scss";

const ViewShelf: FC = () => {
	const params = useParams();
	const getShelf = apiClient.storage.getShelf.useQuery(
		{ id: (params?.shelfId as string) ?? "" },
		{ enabled: params?.shelfId !== undefined }
	);

	return (
		<FullHeight style={{ maxWidth: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} className={styles["container"]} fullWidth>
				{getShelf.isLoading && <Loading />}

				{getShelf.data && (
					<>
						<PageHeader
							title={`Regał ${getShelf.data.name}`}
							description={
								"Przeglądaj stary lub twórz zupełnie nowy asortyment. Wspierana jest również opcja importu asortymentu z pliku CSV."
							}
						/>

						<Shelf shelfData={getShelf.data} />
					</>
				)}

				{getShelf.error && <FormError>{getPolishErrorMessageByMetadata(getShelf.error.data?.metadata)}</FormError>}
			</Flex>
		</FullHeight>
	);
};

export default ViewShelf;
