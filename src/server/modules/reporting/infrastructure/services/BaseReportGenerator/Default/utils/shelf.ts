import lodash from "lodash";
import type { ShelfVO } from "@/server/modules/reporting/domain/vo/ShelfVO";
import type { SharedContext } from "./type";
import { centeredInContainer, roundNumber, shouldWrapToNewPage } from "./shared";
import { assortments } from "./assortment";

export const shelf = async (ctx: SharedContext, shelf: ShelfVO, index?: string, height = 75, compact = false) => {
	const startingX = ctx.document.x;
	const startingY = ctx.document.y;

	const seperatorHeight = 1 + ctx.constants.margin / 2;
	const heightToDistribute = height - seperatorHeight;
	const firstSectionHeight = heightToDistribute * 0.3;

	let widthOfIndexString = 0;
	if (index) {
		const heightOfIndexString = ctx.document.fontSize(20).heightOfString(index);
		widthOfIndexString = ctx.document.widthOfString(index);

		ctx.document.text(index, startingX, startingY + centeredInContainer(firstSectionHeight, heightOfIndexString));
	}

	const indexX = startingX + widthOfIndexString;

	const heightOfNameString = ctx.document.fontSize(16).heightOfString(shelf.name);
	const widthOfNameString = ctx.document.widthOfString(shelf.name);

	const margin = compact ? 0 : ctx.constants.margin;
	ctx.document.text(
		shelf.name,
		indexX + margin,
		startingY + centeredInContainer(firstSectionHeight, heightOfNameString)
	);

	const afterName = indexX + margin + widthOfNameString + ctx.constants.margin;

	const comment = lodash.truncate(shelf.comment, { length: 50 });
	const heightOfCommentString = ctx.document.fontSize(14).heightOfString(comment);

	ctx.document.fillColor(ctx.constants.colors.gray);
	ctx.document.text(comment, afterName, startingY + centeredInContainer(firstSectionHeight, heightOfCommentString));
	ctx.document.fillColor(ctx.constants.colors.black);

	const lineY = startingY + firstSectionHeight + seperatorHeight / 2;
	const lineStartX = startingX;
	const lineEndX = ctx.document.page.width - ctx.document.page.margins.right;
	const lineWidth = lineEndX - lineStartX;

	ctx.document.moveTo(lineStartX, lineY);
	ctx.document.lineTo(lineEndX, lineY);
	ctx.document.stroke();

	const temperatureMinimum = roundNumber(shelf.temperatureRange.minimalCelsius);
	const temperatureMaximum = roundNumber(shelf.temperatureRange.maximalCelsius);
	const temperaturesRange = `zakres temperatur: ${temperatureMinimum} do ${temperatureMaximum}°C`;
	const currentTemperature = `obecna temperatura: ${roundNumber(shelf.currentTemperatureCelsius)}°C`;

	const supportedWeight = `wspierana waga: ${roundNumber(shelf.maxWeightKg)}kg`;
	const currentWeight = `obecna waga: ${roundNumber(shelf.lastRecordedLegalWeightKg)}kg`;

	const maxLength = `${roundNumber(shelf.maxAssortmentSize.lengthMillimeters)}`;
	const maxWidth = `${roundNumber(shelf.maxAssortmentSize.widthMillimeters)}`;
	const maxHeight = `${roundNumber(shelf.maxAssortmentSize.heightMillimeters)}`;
	const maxSize = `maksymalny wspierany rozmiar: ${maxLength}x${maxWidth}x${maxHeight}mm`;

	const supportsHazardous = `wspiera niebezpieczne: ${shelf.supportsHazardous ? "Tak" : "Nie"}`;

	const contextString = `${temperaturesRange}, ${currentTemperature}, ${supportedWeight}, ${currentWeight}, ${maxSize}, ${supportsHazardous}`;

	ctx.document.fillColor(ctx.constants.colors.gray);
	ctx.document
		.fontSize(compact ? 11 : 14)
		.text(contextString, startingX, startingY + firstSectionHeight + ctx.constants.margin / 2, {
			width: lineWidth,
			lineGap: compact ? 1 : undefined,
			align: "justify",
		});
	ctx.document.fillColor(ctx.constants.colors.black);

	ctx.document.x = startingX;
	ctx.document.y = startingY + height + ctx.constants.margin;

	await assortments(ctx, shelf.assortments, index, height);
};

export const shelves = async (ctx: SharedContext, shelves: ShelfVO[], height = 75) => {
	let i = 0;
	for (const shelfData of shelves) {
		if (shouldWrapToNewPage(ctx, height)) ctx.document.addPage();

		i += 1;
		await shelf(ctx, shelfData, `${i.toString()}.`, height);
	}
};
