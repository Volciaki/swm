import PDFKit from "pdfkit";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { Base64Mapper, loadAssetByName } from "@/server/utils";
import { GeneratedReport, ReportGenerator } from "@/server/modules/reporting/domain/services/ReportGenerator";
import { ReportType } from "@/server/modules/reporting/domain/entities/Report";
import { PDFDocument, ReportGeneratorConstants } from "./type";
import { DefaultReportGeneratorUtils, ReportGeneratorUtils } from "./utils";

export abstract class DefaultBaseReportGenerator<T extends ReportType> implements ReportGenerator<T> {
	protected readonly document: PDFDocument;
	protected readonly utils: ReportGeneratorUtils;
	protected readonly constants: ReportGeneratorConstants = {
		margin: 10,
		page: {
			margins: {
				top: 36,
				bottom: 36,
				left: 36,
				right: 36,
			},
		},
		colors: {
			black: [0, 0, 0],
			gray: [128, 128, 128],
		},
	};

	constructor() {
		this.document = new PDFKit({
			size: "A4",
			info: {
				Title: "Dokument SWM",
				Author: "SWM",
				CreationDate: new Date(),
			},
			displayTitle: true,
			lang: "pl",
			margins: this.constants.page.margins,
		});

		const regularFontBuffer = loadAssetByName("inter.ttf");
		const boldFontBuffer = loadAssetByName("inter-bold.ttf");
		this.document.registerFont("regular", regularFontBuffer);
		this.document.registerFont("bold", boldFontBuffer);
		this.document.font("regular");

		this.utils = new DefaultReportGeneratorUtils(this.document, this.constants);
	}

	protected abstract getType(): T;

	protected async getReturnValue(): ReturnType<ReportGenerator<T>["generate"]> {
		this.document.end();

		const buffer = await streamToBuffer(this.document);
		return {
			metadata: { type: this.getType() },
			content: Base64Mapper.fromBuffer(buffer),
		};
	}

	abstract generate(): Promise<GeneratedReport<T>>;
}
