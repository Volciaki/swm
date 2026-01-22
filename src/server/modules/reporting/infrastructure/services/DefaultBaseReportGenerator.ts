import PDFKit from "pdfkit";
import lodash from "lodash";
import { format as formatDateExternal } from "date-fns";
import { getStreamAsBuffer as streamToBuffer } from "get-stream";
import { Base64Mapper, loadAssetByName } from "@/server/utils";
import { GeneratedReport, ReportGenerator } from "../../domain/services/ReportGenerator";
import { ReportType } from "../../domain/entities/Report";
import { AssortmentVO } from "../../domain/vo/AssortmentVO";
import { ShelfVO } from "../../domain/vo/ShelfVO";

// TODO: refactor this into multiple files.

const formatDate = (date: Date) => formatDateExternal(date, "HH:mm:ss dd.MM.yyyy");

type PDFDocument = typeof PDFKit;

// Yes, the library doesn't expose this type. We have to extract it ourselves using some method's signature...
type ImageOptions = NonNullable<Parameters<PDFDocument["image"]>[1]>;

type RGBColor = [number, number, number];

type ReportGeneratorConstants = {
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

interface ReportGeneratorUtils {
	date(): void;
	remoteImage(url: string, x?: number, y?: number, options?: ImageOptions): Promise<void>;
	assortment(assortment: AssortmentVO, index: string, height?: number): Promise<void>;
	assortments(assortments: AssortmentVO[], index?: string, height?: number): Promise<void>;
	shelf(shelf: ShelfVO, index: string, height?: number): Promise<void>;
	shelves(shelves: ShelfVO[], height?: number): Promise<void>;
	header(text: string): void;
};

class DefaultReportGeneratorUtils implements ReportGeneratorUtils {
	constructor(
		private readonly document: PDFDocument,
		private readonly constants: ReportGeneratorConstants,
	) { }

	date() {
		const date = new Date();
		const dateText = formatDate(date);
		this.document
			.fontSize(14)
			.text(dateText, this.document.x, this.document.y, { align: "right" });
	}

	async remoteImage(
		url: string,
		x?: number,
		y?: number,
		options?: ImageOptions,
	) {
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();

		this.document.image(buffer, x, y, options);
	}

	async assortment(assortment: AssortmentVO, index: string, height = 75) {
		const startingX = this.document.x;
		const startingY = this.document.y;

		const imageUrl = assortment.image?.visibility.publicUrl;
		if (imageUrl) await this.remoteImage(
			imageUrl,
			this.document.x,
			this.document.y,
			{
				width: height,
				height,
			}
		);

		const seperatorHeight = 1 + (this.constants.margin / 2);
		const heightToDistribute = height - seperatorHeight;
		const firstSectionHeight = heightToDistribute * 0.3;

		const heightOfIndexString = this.document.fontSize(20).heightOfString(index);
		const widthOfIndexString = this.document.widthOfString(index);

		this.document.text(
			index,
			startingX + height + this.constants.margin,
			startingY + (firstSectionHeight / 2) - (heightOfIndexString / 2),
		);

		const heightOfNameString = this.document.fontSize(16).heightOfString(assortment.name);
		const widthOfNameString = this.document.widthOfString(assortment.name);

		this.document.text(
			assortment.name,
			this.document.x + widthOfIndexString + this.constants.margin,
			startingY + (firstSectionHeight / 2) - (heightOfNameString / 2),
		);

		const comment = lodash.truncate(assortment.comment, { length: 12 - index.length });
		const heightOfCommentString = this.document.fontSize(14).heightOfString(comment);
		const widthOfCommentString = this.document.widthOfString(comment);

		this.document.fillColor(this.constants.colors.gray);
		this.document.text(
			comment,
			this.document.x + widthOfNameString + this.constants.margin,
			startingY + (firstSectionHeight / 2) - (heightOfCommentString / 2),
		);
		this.document.fillColor(this.constants.colors.black);

		const assortmentState = `Status: ${assortment.hasExpired
			? "przeterminowany"
			: assortment.isCloseToExpiration
				? "bliski przeterminowania"
				: "zdatny do użytku"
		}`;
		const heightOfStateString = this.document.fontSize(12).heightOfString(assortmentState);

		this.document.text(
			assortmentState,
			this.document.x + widthOfCommentString + this.constants.margin,
			startingY + (firstSectionHeight / 2) - (heightOfStateString / 2),
			{
				align: "right",
				width: this.document.page.width - (height * 2) - (this.constants.margin * 5) - widthOfIndexString - widthOfNameString - widthOfCommentString - this.constants.page.margins.left - this.constants.page.margins.right
			},
		);

		this.document.moveTo(
			startingX + height + this.constants.margin,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.lineTo(
			this.document.page.width - this.document.page.margins.right - height - this.constants.margin,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.stroke();

		const dateFormatter = (dateTimestamp: number): string => formatDate(new Date(dateTimestamp));
		// TODO: Dear God.. refactor this later
		const contextString = `zakres temperatur: ${assortment.temperatureRange.minimalCelsius} do ${assortment.temperatureRange.maximalCelsius}°C, waga: ${assortment.weightKg}kg, rozmiary: ${assortment.size.lengthMillimeters}x${assortment.size.widthMillimeters}x${assortment.size.heightMillimeters}mm, data przyjęcia: ${dateFormatter(assortment.storedAtTimestamp)}, ważny do: ${dateFormatter(assortment.storedAtTimestamp + assortment.expiresAfterSeconds * 1000)}`

		this.document.fillColor(this.constants.colors.gray);
		this.document.text(
			contextString,
			startingX + height + this.constants.margin,
			startingY + firstSectionHeight + (this.constants.margin / 2),
			{ width: this.document.page.width - (height * 2) - (this.constants.margin * 2) - this.constants.page.margins.left - this.constants.page.margins.right },
		);
		this.document.fillColor(this.constants.colors.black);

		const qrCodeUrl = assortment.qrCode.visibility.publicUrl;
		if (qrCodeUrl) await this.remoteImage(
			qrCodeUrl,
			this.document.page.width - this.document.page.margins.right - height,
			startingY - 3,
			{
				// The QR codes have some padding.
				width: height + 5,
				height: height + 5,
			}
		);

		this.document.x = startingX;
		this.document.y = startingY + height + this.constants.margin;
	}

	async assortments(assortments: AssortmentVO[], index?: string, height = 75) {
		let i = 0;
		for (const assortment of assortments) {
			// If next Assortment doesn't fit on this page, create a new one.
			if (this.document.y + height > this.document.page.height - this.constants.page.margins.bottom) this.document.addPage();

			i += 1;
			await this.assortment(assortment, `${index ?? ""}${i.toString()}.`, height);
		}
	}

	async shelf(shelf: ShelfVO, index: string, height = 75) {
		const startingX = this.document.x;
		const startingY = this.document.y;

		const seperatorHeight = 1 + (this.constants.margin / 2);
		const heightToDistribute = height - seperatorHeight;
		const firstSectionHeight = heightToDistribute * 0.3;

		const heightOfIndexString = this.document.fontSize(20).heightOfString(index);
		const widthOfIndexString = this.document.widthOfString(index);

		this.document.text(
			index,
			startingX,
			startingY + (firstSectionHeight / 2) - (heightOfIndexString / 2),
		);

		const heightOfNameString = this.document.fontSize(16).heightOfString(shelf.name);
		const widthOfNameString = this.document.widthOfString(shelf.name);

		this.document.text(
			shelf.name,
			this.document.x + widthOfIndexString + this.constants.margin,
			startingY + (firstSectionHeight / 2) - (heightOfNameString / 2),
		);

		const comment = lodash.truncate(shelf.comment, { length: 50 });
		const heightOfCommentString = this.document.fontSize(14).heightOfString(comment);

		this.document.fillColor(this.constants.colors.gray);
		this.document.text(
			comment,
			this.document.x + widthOfNameString + this.constants.margin,
			startingY + (firstSectionHeight / 2) - (heightOfCommentString / 2),
		);
		this.document.fillColor(this.constants.colors.black);

		this.document.moveTo(
			startingX,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.lineTo(
			this.document.page.width - this.document.page.margins.right,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.stroke();

		// TODO: Dear God.. refactor this later
		const contextString = `zakres temperatur: ${shelf.temperatureRange.minimalCelsius} do ${shelf.temperatureRange.maximalCelsius}°C, obecna temperatura: ${shelf.currentTemperatureCelsius}°C, wspierana waga: ${shelf.maxWeightKg}kg, obecna waga: ${shelf.lastRecordedLegalWeightKg}kg, maksymalny wspierany rozmiar: ${shelf.maxAssortmentSize.lengthMillimeters}x${shelf.maxAssortmentSize.widthMillimeters}x${shelf.maxAssortmentSize.heightMillimeters}mm, wspiera niebezpieczne: ${shelf.supportsHazardous ? "Tak" : "Nie"}`;
		this.document.fillColor(this.constants.colors.gray);
		this.document.text(
			contextString,
			startingX,
			startingY + firstSectionHeight + (this.constants.margin / 2),
			{ width: this.document.page.width - this.constants.page.margins.left - this.constants.page.margins.right },
		);
		this.document.fillColor(this.constants.colors.black);


		this.document.x = startingX;
		this.document.y = startingY + height + this.constants.margin;

		await this.assortments(shelf.assortments, index, height);
	}

	async shelves(shelves: ShelfVO[], height = 75): Promise<void> {
		let i = 0;
		for (const shelf of shelves) {
			if (this.document.y + height > this.document.page.height - this.constants.page.margins.bottom) this.document.addPage();

			i += 1;
			await this.shelf(shelf, `${i.toString()}.`, height);
		}
	}

	header(text: string) {
		this.document.fontSize(20).text(
			text,
			this.document.x,
			this.document.y + this.constants.margin,
			{ align: "center" },
		);

	}
}

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
