import { createRouter } from "../../init";

import { createShelf } from "./createShelf";
import { importShelves } from "./importShelves";
import { getShelf } from "./getShelf";
import { updateShelf } from "./updateShelf";
import { deleteShelf } from "./deleteShelf";
import { createAssortment } from "./createAssortment";
import { importAssortment } from "./importAssortment";
import { getAssortmentInstance } from "./getAssortmentInstance";
import { updateAssortment } from "./updateAssortment";
import { deleteAssortment } from "./deleteAssortment";
import { getAllShelves } from "./getAllShelves";
import { putUpAssortment } from "./putUpAssortment";
import { takeDownAssortment } from "./takeDownAssortment";
import { takeDownOldestAssortmentByDefinition } from "./takeDownOldestAssortmentByDefinition";
import { getNextAssortmentToBeTakenDownByDefinition } from "./getNextAssortmentToBeTakenDownByDefinition";
import { putUpAssortmentAutomatically } from "./putUpAssortmentAutomatically";
import { getAllAssortments } from "./getAllAssortments";
import { getAssortment } from "./getAssortment";

export const storageRouter = createRouter({
	createShelf,
	importShelves,
	getShelf,
	updateShelf,
	deleteShelf,
	createAssortment,
	importAssortment,
	getAssortmentInstance,
	updateAssortment,
	deleteAssortment,
	getAllShelves,
	putUpAssortment,
	takeDownAssortment,
	takeDownOldestAssortmentByDefinition,
	getNextAssortmentToBeTakenDownByDefinition,
	putUpAssortmentAutomatically,
	getAllAssortments,
	getAssortment,
});
