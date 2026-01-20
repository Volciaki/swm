import PDFDocument from "pdfkit";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { Base64Mapper } from "@/server/utils/base64";
import { ReportType } from "../../domain/entities/Report";
import { CloseToExpirationAssortmentReportGenerator } from "../../domain/services/ReportGenerator";

export class DefaultCloseToExpirationAssortmentReportGenerator implements CloseToExpirationAssortmentReportGenerator {
	async generate() {
		const doc = new PDFDocument();
		doc.text("DefaultCloseToExpirationAssortmentReportGenerator");
		doc.end();

		const buffer = await streamToBuffer(doc);
		return {
			metadata: { type: ReportType.CLOSE_TO_EXPIRATION_ASSORTMENT as const },
			content: Base64Mapper.fromBuffer(buffer),
		};
	}
}
