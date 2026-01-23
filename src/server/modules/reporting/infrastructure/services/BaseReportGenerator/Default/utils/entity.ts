import lodash from "lodash";
import { format as formatDateExternal } from "date-fns";
import { AssortmentVO } from "@/server/modules/reporting/domain/vo/AssortmentVO";
import { PDFDocument, ReportGeneratorConstants } from "../type";
import { ImageOptions, ReportGeneratorUtils, ReportTemperatureExceededData } from "./type";
import { ShelfVO } from "@/server/modules/reporting/domain/vo/ShelfVO";

const roundNumber = (value: number): number => Number(value.toFixed(3));

const formatDate = (date: Date) => formatDateExternal(date, "HH:mm:ss dd.MM.yyyy");

export class DefaultReportGeneratorUtils implements ReportGeneratorUtils {
	constructor(
		private readonly document: PDFDocument,
		private readonly constants: ReportGeneratorConstants,
	) { }

	header(text: string) {
		this.document.fontSize(20).text(
			text,
			this.document.x,
			this.document.y + this.constants.margin,
			{ align: "center" },
		);
	}

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

	async assortment(assortment: AssortmentVO, index?: string, height = 75, compact = false) {
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

		let widthOfIndexString = 0;
		if (index) {
			const heightOfIndexString = this.document.fontSize(20).heightOfString(index);
			widthOfIndexString = this.document.widthOfString(index);

			this.document.text(
				index,
				startingX + height + this.constants.margin,
				startingY + (firstSectionHeight / 2) - (heightOfIndexString / 2),
			);
		}

		const heightOfNameString = this.document.fontSize(16).heightOfString(assortment.name);
		const widthOfNameString = this.document.widthOfString(assortment.name);

		this.document.text(
			assortment.name,
			startingX + height + widthOfIndexString + this.constants.margin,
			startingY + (firstSectionHeight / 2) - (heightOfNameString / 2),
		);

		let heightOfCommentString = 0;
		let widthOfCommentString = 0;
		if (!compact) {
			const comment = lodash.truncate(assortment.comment, { length: 12 - (index?.length ?? 0) });
			heightOfCommentString = this.document.fontSize(14).heightOfString(comment);
			widthOfCommentString = this.document.widthOfString(comment);

			this.document.fillColor(this.constants.colors.gray);
			this.document.text(
				comment,
				this.document.x + widthOfNameString + this.constants.margin,
				startingY + (firstSectionHeight / 2) - (heightOfCommentString / 2),
			);
			this.document.fillColor(this.constants.colors.black);
		}

		const assortmentState = `Status: ${assortment.hasExpired
			? "przeterminowany"
			: assortment.isCloseToExpiration
				? "bliski przeterminowania"
				: "zdatny do użytku"
		}`;
		const heightOfStateString = this.document.fontSize(12).heightOfString(assortmentState);
		const widthOfStateString = this.document.widthOfString(assortmentState);

		this.document.text(
			assortmentState,
			this.document.page.width - this.constants.page.margins.right - height - this.constants.margin - widthOfStateString,
			startingY + (firstSectionHeight / 2) - (heightOfStateString / 2),
			{
				width: this.document.page.width - (height * 2) - (this.constants.margin * 5) - widthOfIndexString - widthOfNameString - widthOfCommentString - this.constants.page.margins.left - this.constants.page.margins.right
			},
		);

		const lineStartX = startingX + height + this.constants.margin;
		const lineEndX = this.document.page.width - this.document.page.margins.right - height - this.constants.margin;
		this.document.moveTo(
			lineStartX,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.lineTo(
			lineEndX,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.stroke();

		const lineWidth = lineEndX - lineStartX;

		const dateFormatter = (dateTimestamp: number): string => formatDate(new Date(dateTimestamp));
		// TODO: Dear God.. refactor this later
		const contextString = `zakres temperatur: ${roundNumber(assortment.temperatureRange.minimalCelsius)} do ${roundNumber(assortment.temperatureRange.maximalCelsius)}°C, waga: ${roundNumber(assortment.weightKg)}kg, rozmiary: ${roundNumber(assortment.size.lengthMillimeters)}x${roundNumber(assortment.size.widthMillimeters)}x${roundNumber(assortment.size.heightMillimeters)}mm, data przyjęcia: ${dateFormatter(assortment.storedAtTimestamp)}, ważny do: ${dateFormatter(assortment.storedAtTimestamp + assortment.expiresAfterSeconds * 1000)}`

		this.document.fillColor(this.constants.colors.gray);
		this.document.fontSize(compact ? 10 : 12).text(
			contextString,
			startingX + height + this.constants.margin,
			startingY + firstSectionHeight + (this.constants.margin / 2),
			{ width: lineWidth, align: "justify" },
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

	async shelf(shelf: ShelfVO, index?: string, height = 75, compact = false) {
		const startingX = this.document.x;
		const startingY = this.document.y;

		const seperatorHeight = 1 + (this.constants.margin / 2);
		const heightToDistribute = height - seperatorHeight;
		const firstSectionHeight = heightToDistribute * 0.3;

		let widthOfIndexString = 0;
		if (index) {
			const heightOfIndexString = this.document.fontSize(20).heightOfString(index);
			widthOfIndexString = this.document.widthOfString(index);

			this.document.text(
				index,
				startingX,
				startingY + (firstSectionHeight / 2) - (heightOfIndexString / 2),
			);
		}

		const heightOfNameString = this.document.fontSize(16).heightOfString(shelf.name);
		const widthOfNameString = this.document.widthOfString(shelf.name);

		this.document.text(
			shelf.name,
			this.document.x + widthOfIndexString + this.constants.margin - (compact ? this.constants.margin : 0),
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

		const lineStartX = startingX;
		const lineEndX = this.document.page.width - this.document.page.margins.right;
		const lineWidth = lineEndX - lineStartX;

		this.document.moveTo(
			lineStartX,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.lineTo(
			lineEndX,
			startingY + firstSectionHeight + (seperatorHeight / 2)
		);
		this.document.stroke();

		// TODO: Dear God.. refactor this later
		const contextString = `zakres temperatur: ${roundNumber(shelf.temperatureRange.minimalCelsius)} do ${roundNumber(shelf.temperatureRange.maximalCelsius)}°C, obecna temperatura: ${roundNumber(shelf.currentTemperatureCelsius)}°C, wspierana waga: ${roundNumber(shelf.maxWeightKg)}kg, obecna waga: ${roundNumber(shelf.lastRecordedLegalWeightKg)}kg, maksymalny wspierany rozmiar: ${roundNumber(shelf.maxAssortmentSize.lengthMillimeters)}x${roundNumber(shelf.maxAssortmentSize.widthMillimeters)}x${roundNumber(shelf.maxAssortmentSize.heightMillimeters)}mm, wspiera niebezpieczne: ${shelf.supportsHazardous ? "Tak" : "Nie"}`;
		this.document.fillColor(this.constants.colors.gray);
		this.document.fontSize(compact ? 11 : 14).text(
			contextString,
			startingX,
			startingY + firstSectionHeight + (this.constants.margin / 2),
			{ width: lineWidth, lineGap: compact ? 1 : undefined, align: "justify" },
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

	async temperatureExceeded(temperature: ReportTemperatureExceededData, height = 75): Promise<void> {
		const startingX = this.document.x;
		const startingY = this.document.y;

		const cardWidth = height * 1.5;

		const seperatorHeight = 1 + (this.constants.margin / 2);
		const heightToDistribute = height - seperatorHeight;
		const sectionHeight = heightToDistribute * 0.5;

		const upperString = "Temperatura za:";
		const widthOfUpperString = this.document.fontSize(12).widthOfString(upperString);
		const heightOfUpperString = this.document.heightOfString(upperString);

		this.document.fillColor(this.constants.colors.gray);
		this.document.text(
			upperString,
			startingX + (cardWidth / 2) - (widthOfUpperString / 2),
			startingY,
		);
		this.document.fillColor(this.constants.colors.black);

		const statusString = temperature.details.temperatureCelsius > temperature.entity.temperatureRange.maximalCelsius
			? "Wysoka"
			: "Niska";
		const widthOfStatusString = this.document.fontSize(16).widthOfString(statusString);

		this.document.text(
			statusString,
			startingX + (cardWidth / 2) - (widthOfStatusString / 2),
			startingY + heightOfUpperString,
		);

		this.document.moveTo(
			startingX,
			startingY + sectionHeight + (seperatorHeight / 2)
		);
		this.document.lineTo(
			startingX + cardWidth,
			startingY + sectionHeight + (seperatorHeight / 2)
		);
		this.document.stroke();

		const dateFormatter = (dateTimestamp: number): string => formatDate(new Date(dateTimestamp));
		const temperatureRounded = Number(temperature.details.temperatureCelsius.toFixed(3));
		const contextString = `data: ${dateFormatter(temperature.details.dateTimestamp)}, temperatura: ${temperatureRounded}°C`;
		const contextStringHeight = this.document.fontSize(12).heightOfString(contextString);

		this.document.fillColor(this.constants.colors.gray);
		this.document.fontSize(8).text(
			contextString,
			startingX,
			startingY + sectionHeight + (seperatorHeight / 2) + (contextStringHeight / 2),
			{ width: cardWidth, lineGap: 2, align: "justify" },
		);
		this.document.fillColor(this.constants.colors.black);

		this.document.y = startingY;
		this.document.x = startingX + cardWidth + this.constants.margin;

		if (temperature.entityType === "shelf") {
			await this.shelf(temperature.entity as ShelfVO, undefined, height, true);
		} else {
			await this.assortment(temperature.entity as AssortmentVO, undefined, height, true);
		}

		this.document.x = startingX;
		this.document.y = startingY + height + this.constants.margin;
	}

	async temperaturesExceeded(temperatures: ReportTemperatureExceededData[], height = 75): Promise<void> {
		for (const temperature of temperatures) {
			if (this.document.y + height > this.document.page.height - this.constants.page.margins.bottom) this.document.addPage();

			await this.temperatureExceeded(temperature, height);
		}
	}
}
