import { ReactNode, useState, type FC } from "react";
import { Button, Paragraph, Loading, FormError } from "@/ui/atoms";

export type GenerateReportButtonProps = {
	buttonName: string;
};

export const GenerateReportButton: FC<GenerateReportButtonProps> = ({ buttonName }) => {
	// Tutaj pole do popisu dla khenziiegoo
	// Taka sugestia dla cb żebyś zrobił switcha() dla buttonName żeby to później fajnie śmigało razem a nie osobno instancje

	return (
		<>
			<Button>
				<Paragraph fontSize={1.5}>{buttonName}</Paragraph>
			</Button>
		</>
	);
};
