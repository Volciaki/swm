import { format as formatDateExternal } from "date-fns";
import type { SharedContext } from "./type";

export const formatDate = (date: Date) => formatDateExternal(date, "HH:mm:ss dd.MM.yyyy");

export const dateFormatter = (dateTimestamp: number): string => formatDate(new Date(dateTimestamp));

export const roundNumber = (value: number): number => Number(value.toFixed(3));

export const shouldWrapToNewPage = (ctx: SharedContext, height: number): boolean =>
	ctx.document.y + height > ctx.document.page.height - ctx.constants.page.margins.bottom;

export const centeredInContainer = (containerHeight: number, objectHeight: number): number =>
	containerHeight / 2 - objectHeight / 2;
