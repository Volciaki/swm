"use client";

import { type ReactNode, type FC, useCallback } from "react";
import { GenerateReportButton } from "@/ui/templates";
import { PageHeader } from "@/ui/molecules";
import { Flex, FullHeight, Paragraph } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import commonStyles from "@/styles/common.module.scss";
import type { FileReferenceDTO } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";

type ReportsFormProps = {
	children: ReactNode;
	text: string;
	description: string;
};

const GenerateReportForm: FC<ReportsFormProps> = ({ children, text, description }) => (
	<Flex
		direction={"column"}
		align={"center"}
		style={{ gap: "1rem", height: "fit-content" }}
		className={commonStyles["form-container"]}
		fullWidth
	>
		<Paragraph style={{ textAlign: "center" }} fontSize={1.5}>
			{text}
		</Paragraph>

		<Paragraph variant="secondary" style={{ textAlign: "center" }} fontSize={1.25}>
			{description}
		</Paragraph>

		{children}
	</Flex>
);

const Reports: FC = () => {
	const generateFullStorageShowcase = apiClient.reports.generateFullStorageShowcase.useMutation();
	const generateTemperatureExceededDetails = apiClient.reports.generateTemperatureExceededDetails.useMutation();
	const generateCloseToExpirationAssortment = apiClient.reports.generateCloseToExpirationAssortment.useMutation();

	const openUrlByFileDTO = useCallback((data: FileReferenceDTO | undefined) => {
		if (!data) return;
		if (!data.visibility.publicUrl) return;

		window.open(data.visibility.publicUrl);
	}, []);

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader title={"Raporty"} description={"Automatycznie generuj różne warianty raportów."} />

				<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
					<GenerateReportForm
						text={"Raport o pełnej inwentaryzacji magazynu"}
						description={"Pełna inwentaryzacja magazynu"}
					>
						<GenerateReportButton<typeof generateFullStorageShowcase>
							mutation={generateFullStorageShowcase}
							onSuccess={(data) => openUrlByFileDTO(data?.file)}
						/>
					</GenerateReportForm>

					<GenerateReportForm
						text={"Raport o zbliżającym się końcu ważności"}
						description={"Wszystkie wydarzenia związane z przekroczeniem temperatury regału lub asortymentu"}
					>
						<GenerateReportButton
							mutation={generateCloseToExpirationAssortment}
							onSuccess={(data) => openUrlByFileDTO(data?.file)}
						/>
					</GenerateReportForm>

					<GenerateReportForm
						text={"Raport o przekroczonej temperaturze"}
						description={"Wszystkie wydarzenia związane z przekroczeniem temperatury regału lub asortymentu"}
					>
						<GenerateReportButton
							mutation={generateTemperatureExceededDetails}
							onSuccess={(data) => openUrlByFileDTO(data?.file)}
						/>
					</GenerateReportForm>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Reports;
