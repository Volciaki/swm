"use client";

import { type ReactNode, type FC, useState } from "react";
import { GenerateReportButton } from "@/ui/templates";
import { PageHeader } from "@/ui/molecules";
import { Flex, FullHeight, Paragraph } from "@/ui/atoms";
import type { CustomStyles } from "@/ui/types";
import commonStyles from "@/styles/common.module.scss";
import styles from "@/styles/backup.module.scss";

type ReportsFormProps = {
  children: ReactNode;
  style?: CustomStyles["style"];
};

const ReportsForm: FC<ReportsFormProps> = ({ children, style }) => (
  <Flex
    direction={"column"}
    align={"center"}
    style={{ gap: "1rem", height: "fit-content", ...style }}
    className={commonStyles["form-container"]}
  >
    {children}
  </Flex>
);

const Reports: FC = () => {
	// Jak będziesz robił backend to najlepiej zacznij od tego przycisku 'GenerateReportButton' (@/ui/template)
	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} className={styles["container"]}>
				<PageHeader
					title={"Raporty"}
					description={
						"Szybko generuj różne raporty na temat asortymentu, automatycznie."
					}
				/>

				<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
					<ReportsForm style={{ width: "30%" }}>
						<Paragraph style={{ textAlign: "center", fontSize:"1.5rem" }}>{"Raport o zbliżającym się końcu ważności"}</Paragraph>
            <Paragraph variant="secondary" style={{ textAlign: "center", fontSize:"1.3rem" }}>{"Informacje na temat asortymentu, którego data ważności niedługo zostanie przekroczona"}</Paragraph>

						<GenerateReportButton buttonName="Generuj raport" />
					</ReportsForm>

					<ReportsForm style={{ width: "30%" }}>
						<Paragraph style={{ textAlign: "center", fontSize:"1.5rem" }}>{"Raport o przekroczonej temperaturze"}</Paragraph>
            <Paragraph variant="secondary" style={{ textAlign: "center", fontSize:"1.3rem" }}>{"Wszystkie wydarzenia związane z przekroczeniem temperatury regału lub asortymentu"}</Paragraph>

						<GenerateReportButton buttonName="Generuj raport" />
					</ReportsForm>

          <ReportsForm style={{ width: "30%" }}>
						<Paragraph style={{ textAlign: "center", fontSize:"1.5rem" }}>{"Raport o pełnej inwentaryzacji magazynu"}</Paragraph>
            <Paragraph variant="secondary" style={{ textAlign: "center", fontSize:"1.3rem" }}>{"Pełna inwentaryzacja magazynu"}</Paragraph>

						<GenerateReportButton buttonName="Generuj raport" />
					</ReportsForm>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Reports;
