import lodash from "lodash";
import type { AssortmentVO } from "@/server/modules/reporting/domain/vo/AssortmentVO";
import type { SharedContext } from "./type";
import { centeredInContainer, dateFormatter, roundNumber, shouldWrapToNewPage } from "./shared";

export const assortment = async (
	ctx: SharedContext,
	assortment: AssortmentVO,
	index?: string,
	height = 75,
	compact = false
) => {
	const startingX = ctx.document.x;
	const startingY = ctx.document.y;

	const imageUrl = assortment.image?.visibility.publicUrl;
	if (imageUrl)
		await ctx.remoteImage(imageUrl, startingX, startingY, {
			width: height,
			height,
		});

	const afterImage = startingX + height + ctx.constants.margin;

	const seperatorHeight = 1 + ctx.constants.margin / 2;
	const heightToDistribute = height - seperatorHeight;
	const firstSectionHeight = heightToDistribute * 0.3;

	let widthOfIndexString = 0;
	if (index) {
		const heightOfIndexString = ctx.document.fontSize(20).heightOfString(index);
		widthOfIndexString = ctx.document.widthOfString(index);

		ctx.document.text(index, afterImage, startingY + centeredInContainer(firstSectionHeight, heightOfIndexString));
	}

	const afterIndexMargin = widthOfIndexString === 0 ? 0 : ctx.constants.margin;
	const afterIndex = afterImage + widthOfIndexString + afterIndexMargin;

	const heightOfNameString = ctx.document.fontSize(16).heightOfString(assortment.name);
	const widthOfNameString = ctx.document.widthOfString(assortment.name);

	ctx.document.text(
		assortment.name,
		afterIndex,
		startingY + centeredInContainer(firstSectionHeight, heightOfNameString)
	);

	const afterName = afterIndex + widthOfNameString + ctx.constants.margin;

	let heightOfCommentString = 0;
	let widthOfCommentString = 0;
	if (!compact) {
		const comment = lodash.truncate(assortment.comment, { length: 10 - (index?.length ?? 0) });
		heightOfCommentString = ctx.document.fontSize(14).heightOfString(comment);
		widthOfCommentString = ctx.document.widthOfString(comment);

		ctx.document.fillColor(ctx.constants.colors.gray);
		ctx.document.text(comment, afterName, startingY + centeredInContainer(firstSectionHeight, heightOfCommentString));
		ctx.document.fillColor(ctx.constants.colors.black);
	}

	const afterComment = afterName + widthOfCommentString + ctx.constants.margin;

	const assortmentState = `Status: ${
		assortment.hasExpired
			? "przeterminowany"
			: assortment.isCloseToExpiration
				? "bliski przeterminowania"
				: "zdatny do użytku"
	}`;
	const heightOfStateString = ctx.document.fontSize(12).heightOfString(assortmentState);

	const rightMostPartOfPage = ctx.document.page.width - ctx.constants.page.margins.right;
	const qrCodeSize = height;
	const endOfStateString = rightMostPartOfPage - qrCodeSize - ctx.constants.margin;
	const startOfStateString = afterComment;

	const stateStringTotalAvailableWidth = endOfStateString - startOfStateString;

	ctx.document.text(
		assortmentState,
		afterComment,
		startingY + centeredInContainer(firstSectionHeight, heightOfStateString),
		{
			width: stateStringTotalAvailableWidth,
			align: "right",
		}
	);

	const lineY = startingY + firstSectionHeight + seperatorHeight / 2;
	const lineStartX = afterImage;
	const lineEndX = endOfStateString;
	const lineWidth = lineEndX - lineStartX;

	ctx.document.moveTo(lineStartX, lineY);
	ctx.document.lineTo(lineEndX, lineY);
	ctx.document.stroke();

	const temperatureMinimum = roundNumber(assortment.temperatureRange.minimalCelsius);
	const temperatureMaximum = roundNumber(assortment.temperatureRange.maximalCelsius);
	const temperaturesRange = `zakres temperatur: ${temperatureMinimum} do ${temperatureMaximum}°C`;

	const weight = `waga: ${roundNumber(assortment.weightKg)}kg`;

	const assortmentLength = roundNumber(assortment.size.lengthMillimeters);
	const assortmentWidth = roundNumber(assortment.size.widthMillimeters);
	const assortmentHeight = roundNumber(assortment.size.heightMillimeters);
	const dimensions = `rozmiary: ${assortmentLength}x${assortmentWidth}x${assortmentHeight}mm`;

	const storageDate = `data przyjęcia: ${dateFormatter(assortment.storedAtTimestamp)}`;

	const validUntil = `ważny do: ${dateFormatter(assortment.storedAtTimestamp + assortment.expiresAfterSeconds * 1000)}`;

	const contextString = `${temperaturesRange}, ${weight}, ${dimensions}, ${storageDate}, ${validUntil}`;

	ctx.document.fillColor(ctx.constants.colors.gray);
	ctx.document
		.fontSize(compact ? 10 : 12)
		.text(contextString, afterImage, startingY + firstSectionHeight + ctx.constants.margin / 2, {
			width: lineWidth,
			align: "justify",
		});
	ctx.document.fillColor(ctx.constants.colors.black);

	const qrCodeUrl = assortment.qrCode.visibility.publicUrl;
	if (qrCodeUrl)
		await ctx.remoteImage(
			qrCodeUrl,
			rightMostPartOfPage - qrCodeSize,
			// The QR codes have some padding.
			startingY - 3,
			{ width: qrCodeSize + 5, height: qrCodeSize + 5 }
		);

	ctx.document.x = startingX;
	ctx.document.y = startingY + height + ctx.constants.margin;
};

export const assortments = async (ctx: SharedContext, assortments: AssortmentVO[], index?: string, height = 75) => {
	let i = 0;
	for (const assortmentData of assortments) {
		if (shouldWrapToNewPage(ctx, height)) ctx.document.addPage();

		i += 1;
		await assortment(ctx, assortmentData, `${index ?? ""}${i.toString()}.`, height);
	}
};
