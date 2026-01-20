import PDFDocument from "pdfkit";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { Base64Mapper } from "@/server/utils/base64";
import { ReportType } from "../../domain/entities/Report";
import { FullStorageShowcaseReportGenerator } from "../../domain/services/ReportGenerator";

export class DefaultFullStorageShowcaseReportGenerator implements FullStorageShowcaseReportGenerator {
	async generate() {
		const doc = new PDFDocument();
		doc.text("DefaultFullStorageShowcaseReportGenerator");
		doc.end();

		const buffer = await streamToBuffer(doc);
		return {
			metadata: { type: ReportType.FULL_STORAGE_SHOWCASE as const },
			content: Base64Mapper.fromBuffer(buffer),
		};
	}
}
