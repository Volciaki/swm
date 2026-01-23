import PDFKit from "pdfkit";

export type PDFDocument = typeof PDFKit;

export type RGBColor = [number, number, number];

export type ReportGeneratorConstants = {
	margin: number;
	page: {
		margins: {
			left: number;
			right: number;
			top: number;
			bottom: number;
		};
	};
	colors: {
		black: RGBColor;
		gray: RGBColor;
	};
};
