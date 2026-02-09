import type { AssortmentVO } from "@/server/modules/reporting/domain/vo/AssortmentVO";
import type { ShelfVO } from "@/server/modules/reporting/domain/vo/ShelfVO";
import { Base64Mapper } from "@/server/utils";
import type { PDFDocument, ReportGeneratorConstants } from "../type";
import type { ImageOptions, ReportGeneratorUtils, ReportTemperatureExceededData, SharedContext } from "./type";
import { formatDate } from "./shared";
import { temperatureExceeded, temperaturesExceeded } from "./temperature-exceeded";
import { assortment, assortments } from "./assortment";
import { shelf, shelves } from "./shelf";

export class DefaultReportGeneratorUtils implements ReportGeneratorUtils {
	constructor(
		private readonly document: PDFDocument,
		private readonly constants: ReportGeneratorConstants
	) {}

	private getContext(): SharedContext {
		return {
			document: this.document,
			constants: this.constants,
			remoteImage: this.remoteImage,
		};
	}

	header(text: string) {
		this.document
			.fontSize(20)
			.text(text, this.document.x, this.document.y + this.constants.margin, { align: "center" });
	}

	date() {
		const date = new Date();
		const dateText = formatDate(date);
		this.document.fontSize(14).text(dateText, this.document.x, this.document.y, { align: "right" });
	}

	async remoteImage(url: string, x?: number, y?: number, options?: ImageOptions) {
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// We're converting the buffer to base 64 here as pdfkit only caches string values.
		// See: https://github.com/foliojs/pdfkit/issues/722
		const base64 = Base64Mapper.fromBuffer(buffer);
		const base64String = `data:image/png;base64,${base64.value}`;

		this.document.image(base64String, x, y, options);
	}

	async assortment(assortmentData: AssortmentVO, index: string, height?: number, compact?: boolean) {
		const context = this.getContext();
		return await assortment(context, assortmentData, index, height, compact);
	}

	async assortments(assortmentsData: AssortmentVO[], index?: string, height?: number): Promise<void> {
		const context = this.getContext();
		return await assortments(context, assortmentsData, index, height);
	}

	async shelf(shelfData: ShelfVO, index: string, height?: number, compact?: boolean) {
		const context = this.getContext();
		return await shelf(context, shelfData, index, height, compact);
	}

	async shelves(shelvesData: ShelfVO[], height?: number) {
		const context = this.getContext();
		return await shelves(context, shelvesData, height);
	}

	async temperatureExceeded(temperature: ReportTemperatureExceededData, height?: number): Promise<void> {
		const context = this.getContext();
		return await temperatureExceeded(context, temperature, height);
	}

	async temperaturesExceeded(temperatures: ReportTemperatureExceededData[], height?: number): Promise<void> {
		const context = this.getContext();
		return await temperaturesExceeded(context, temperatures, height);
	}
}
