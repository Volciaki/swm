import PDFKit from "pdfkit";
import { format as formatDate } from "date-fns";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { Base64Mapper, loadAssetByName } from "@/server/utils";
import { GeneratedReport, ReportGenerator } from "../../domain/services/ReportGenerator";
import { ReportType } from "../../domain/entities/Report";
import { AssortmentVO } from "../../domain/vo/AssortmentVO";

type PDFDocument = typeof PDFKit;

type ReportGeneratorConstants = {
	margin: number
};

interface ReportGeneratorUtils {
	addDate(): void;
	addAssortment(assortment: AssortmentVO): void;
	addAssortments(assortments: AssortmentVO[]): void;
};

class DefaultReportGeneratorUtils implements ReportGeneratorUtils {
	constructor(
		private readonly document: PDFDocument,
		private readonly constants: ReportGeneratorConstants,
	) { }

	addDate() {
		const date = new Date();
		const dateText = formatDate(date, "HH:mm:ss dd.MM.yyyy");
		this.document
			.fontSize(14)
			.text(dateText, this.document.x, this.document.y, { align: "right" });
	}

	addAssortment(assortment: AssortmentVO) {
		this.document.text(
			assortment.name,
			this.document.x,
			this.document.y + this.constants.margin,
			{ align: "left" }
		);
	}

	addAssortments(assortments: AssortmentVO[]) {
		for (const assortment of assortments) {
			this.addAssortment(assortment);
		}
	}
}

export abstract class DefaultBaseReportGenerator<T extends ReportType> implements ReportGenerator<T> {
	protected readonly document: PDFDocument;
	protected readonly utils: ReportGeneratorUtils;
	protected readonly constants: ReportGeneratorConstants = {
		margin: 10,
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
			margins: {
				top: 36,
				bottom: 36,
				left: 36,
				right: 36,
			},
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
