"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { AssortmentCard } from "@/ui/organisms";
import { BackButton, PageHeader } from "@/ui/molecules";
import { FullHeight, Flex, FormError, Loading } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";
import { useMobile } from "@/ui/hooks";

const ViewAssortment: FC = () => {
	const { mobile } = useMobile();
	const params = useParams();
	const getAssortment = apiClient.storage.getAssortment.useQuery(
		{ id: (params?.assortmentId as string) ?? "" },
		{ enabled: params?.assortmentId !== undefined }
	);

	return (
		<FullHeight style={{ width: "100%" }}>
			<BackButton fallback={"/centrum-zarzadzania/wizualizacja/asortymenty"} forceFallback />

			<Flex
				direction={"column"}
				align={"center"}
				style={{ gap: "1rem", marginTop: mobile ? "1rem" : undefined }}
				fullWidth
			>
				{getAssortment.data && (
					<>
						<PageHeader title={`Asortyment ${getAssortment.data.name}`} description={"Przeglądaj dane asortymentu."} />

						<AssortmentCard assortment={getAssortment.data} />
					</>
				)}

				{getAssortment.error && <FormError>{defaultErrorHandler(getAssortment.error, (message) => message)}</FormError>}

				{getAssortment.isLoading && <Loading />}
			</Flex>
		</FullHeight>
	);
};

export default ViewAssortment;
