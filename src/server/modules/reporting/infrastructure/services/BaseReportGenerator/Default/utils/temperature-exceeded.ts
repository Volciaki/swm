import type { AssortmentVO } from "@/server/modules/reporting/domain/vo/AssortmentVO";
import type { ShelfVO } from "@/server/modules/reporting/domain/vo/ShelfVO";
import type { ReportTemperatureExceededData, SharedContext } from "./type";
import { centeredInContainer, dateFormatter, roundNumber, shouldWrapToNewPage } from "./shared";
import { shelf } from "./shelf";
import { assortment } from "./assortment";

export const temperatureExceeded = async (
	ctx: SharedContext,
	temperature: ReportTemperatureExceededData,
	height = 75
) => {
	const startingX = ctx.document.x;
	const startingY = ctx.document.y;

	const cardWidth = height * 1.5;

	const seperatorHeight = 1 + ctx.constants.margin / 2;
	const heightToDistribute = height - seperatorHeight;
	const sectionHeight = heightToDistribute * 0.5;

	const upperString = "Temperatura za:";
	const widthOfUpperString = ctx.document.fontSize(12).widthOfString(upperString);
	const heightOfUpperString = ctx.document.heightOfString(upperString);

	ctx.document.fillColor(ctx.constants.colors.gray);
	ctx.document.text(upperString, startingX + centeredInContainer(cardWidth, widthOfUpperString), startingY);
	ctx.document.fillColor(ctx.constants.colors.black);

	const statusString =
		temperature.details.temperatureCelsius > temperature.entity.temperatureRange.maximalCelsius ? "Wysoka" : "Niska";
	const widthOfStatusString = ctx.document.fontSize(16).widthOfString(statusString);

	ctx.document.text(
		statusString,
		startingX + centeredInContainer(cardWidth, widthOfStatusString),
		startingY + heightOfUpperString
	);

	const lineY = startingY + sectionHeight + seperatorHeight / 2;

	ctx.document.moveTo(startingX, lineY);
	ctx.document.lineTo(startingX + cardWidth, lineY);
	ctx.document.stroke();

	const dateString = `data: ${dateFormatter(temperature.details.dateTimestamp)}`;

	const temperatureString = `temperatura: ${roundNumber(temperature.details.temperatureCelsius)}°C`;

	const contextString = `${dateString}, ${temperatureString}`;
	const contextStringHeight = ctx.document.fontSize(12).heightOfString(contextString);

	ctx.document.fillColor(ctx.constants.colors.gray);
	ctx.document.fontSize(8).text(contextString, startingX, lineY + contextStringHeight / 2, {
		width: cardWidth,
		lineGap: 2,
		align: "justify",
	});
	ctx.document.fillColor(ctx.constants.colors.black);

	ctx.document.y = startingY;
	ctx.document.x = startingX + cardWidth + ctx.constants.margin;

	if (temperature.entityType === "shelf") {
		await shelf(ctx, temperature.entity as ShelfVO, undefined, height, true);
	} else {
		await assortment(ctx, temperature.entity as AssortmentVO, undefined, height, true);
	}

	ctx.document.y = startingY + height + ctx.constants.margin;
	ctx.document.x = startingX;
};

export const temperaturesExceeded = async (
	ctx: SharedContext,
	temperatures: ReportTemperatureExceededData[],
	height = 75
) => {
	for (const temperature of temperatures) {
		if (shouldWrapToNewPage(ctx, height)) ctx.document.addPage();

		await temperatureExceeded(ctx, temperature, height);
	}
};
