import { TemperatureReadingVO } from "@/server/modules/reporting/domain/vo/TemperatureReadingVO";
import { AssortmentVO } from "@/server/modules/reporting/domain/vo/AssortmentVO";
import { ShelfVO } from "@/server/modules/reporting/domain/vo/ShelfVO";
import { PDFDocument, ReportGeneratorConstants } from "../type";

// Yes, the library doesn't expose this type. We have to extract it ourselves using some method's signature...
export type ImageOptions = NonNullable<Parameters<PDFDocument["image"]>[1]>;

export type ReportTemperatureExceededData = {
	entityType: "assortment" | "shelf";
	entity: AssortmentVO | ShelfVO;
	details: TemperatureReadingVO;
};

export interface ReportGeneratorUtils {
	header(text: string): void;
	date(): void;
	remoteImage(url: string, x?: number, y?: number, options?: ImageOptions): Promise<void>;
	assortment(assortment: AssortmentVO, index: string, height?: number, compact?: boolean): Promise<void>;
	assortments(assortments: AssortmentVO[], index?: string, height?: number): Promise<void>;
	shelf(shelf: ShelfVO, index: string, height?: number, compact?: boolean): Promise<void>;
	shelves(shelves: ShelfVO[], height?: number): Promise<void>;
	temperatureExceeded(temperature: ReportTemperatureExceededData, height?: number): Promise<void>;
	temperaturesExceeded(temperatures: ReportTemperatureExceededData[], height?: number): Promise<void>;
};

export type SharedContext = {
	document: PDFDocument;
	constants: ReportGeneratorConstants;
	remoteImage: ReportGeneratorUtils["remoteImage"];
};
