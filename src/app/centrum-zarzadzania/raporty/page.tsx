"use client";

import { type ReactNode, type FC, useCallback, useState, useEffect, useRef } from "react";
import { GenerateReportButton } from "@/ui/templates";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Flex, FullHeight, Paragraph } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import commonStyles from "@/styles/common.module.scss";
import { downloadBase64 } from "@/ui/utils/base64/download";

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
	const [fileReferenceId, setFileReferenceId] = useState<string | null>(null);
	const fileNameRef = useRef<string | null>(null);

	const generateFullStorageShowcase = apiClient.reports.generateFullStorageShowcase.useMutation();
	const generateTemperatureExceededDetails = apiClient.reports.generateTemperatureExceededDetails.useMutation();
	const generateCloseToExpirationAssortment = apiClient.reports.generateCloseToExpirationAssortment.useMutation();
	const fetchReportFileByReferenceId = apiClient.reports.fetchReportFileByReferenceId.useQuery(
		{
			fileReferenceId: fileReferenceId ?? "",
		},
		{ enabled: fileReferenceId !== null }
	);

	const onReportGenerateSuccess = useCallback(
		(data: (typeof generateFullStorageShowcase)["data"], filename: string) => {
			if (!data) return;

			fileNameRef.current = filename;
			setFileReferenceId(data.file.id);
		},
		[]
	);

	useEffect(() => {
		if (!fetchReportFileByReferenceId.data) return;
		if (!fileNameRef.current) return;

		const base64 = fetchReportFileByReferenceId.data.base64;
		downloadBase64(`data:application/pdf;base64,${base64}`, fileNameRef.current);
	}, [fetchReportFileByReferenceId.data]);

	return (
		<FullHeight>
			<BackButton fallback={"/centrum-zarzadzania"} />

			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
				<PageHeader title={"Raporty"} description={"Automatycznie generuj różne warianty raportów."} />

				<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
					<GenerateReportForm
						text={"Raport o pełnej inwentaryzacji magazynu"}
						description={"Pełna inwentaryzacja magazynu"}
					>
						<GenerateReportButton
							mutation={generateFullStorageShowcase}
							onSuccess={(data) => onReportGenerateSuccess(data, "raport-inwentaryzacji-systemu.pdf")}
						/>
					</GenerateReportForm>

					<GenerateReportForm
						text={"Raport o zbliżającym się końcu ważności"}
						description={"Informacje na temat asortymentu, którego data ważności niedługo zostanie przekroczona"}
					>
						<GenerateReportButton
							mutation={generateCloseToExpirationAssortment}
							onSuccess={(data) => onReportGenerateSuccess(data, "raport-asortymentu-bliskiego-do-konca-waznosci.pdf")}
						/>
					</GenerateReportForm>

					<GenerateReportForm
						text={"Raport o przekroczonej temperaturze"}
						description={"Wszystkie wydarzenia związane z przekroczeniem temperatury regału lub asortymentu"}
					>
						<GenerateReportButton
							mutation={generateTemperatureExceededDetails}
							onSuccess={(data) => onReportGenerateSuccess(data, "raport-przekroczonych-temperatur.pdf")}
						/>
					</GenerateReportForm>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Reports;
