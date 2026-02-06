"use client";

import { useMemo, type FC } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FullHeight, Flex, Loading, FormError } from "@/ui/atoms";
import { BackButton, PageHeader, Shelf } from "@/ui/molecules";
import { apiClient } from "@/ui/providers";
import { getPolishErrorMessageByMetadata } from "@/ui/utils";
import styles from "@/styles/view-shelf.module.scss";

const ViewShelf: FC = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const getShelf = apiClient.storage.getShelf.useQuery(
		{ id: (params?.shelfId as string) ?? "" },
		{ enabled: params?.shelfId !== undefined }
	);
	const cellToFocus = useMemo(() => {
		const xString = searchParams.get("x");
		const yString = searchParams.get("y");

		if (!xString || !yString) return undefined;

		const x = Number.parseInt(xString);
		const y = Number.parseInt(yString);

		if (!x || !y) return undefined;

		return { x, y };
	}, [searchParams]);

	return (
		<FullHeight style={{ maxWidth: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja"} forceFallback />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} className={styles["container"]} fullWidth>
				{getShelf.isLoading && <Loading />}

				{getShelf.data && (
					<>
						<PageHeader
							title={`Regał ${getShelf.data.name}`}
							description={"Przeglądaj stary, zdejmuj, lub przyjmuj zupełnie nowy asortyment."}
						/>

						<Shelf shelfData={getShelf.data} cellToFocus={cellToFocus} />
					</>
				)}

				{getShelf.error && <FormError>{getPolishErrorMessageByMetadata(getShelf.error.data?.metadata)}</FormError>}
			</Flex>
		</FullHeight>
	);
};

export default ViewShelf;
