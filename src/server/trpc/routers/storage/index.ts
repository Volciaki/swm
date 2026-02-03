import { createRouter } from "../../init";

import { createShelf } from "./createShelf";
import { importShelves } from "./importShelves";
import { getShelf } from "./getShelf";
import { updateShelf } from "./updateShelf";
import { deleteShelf } from "./deleteShelf";
import { createAssortment } from "./createAssortment";
import { importAssortment } from "./importAssortment";
import { getAssortment } from "./getAssortment";
import { updateAssortment } from "./updateAssortment";
import { deleteAssortment } from "./deleteAssortment";
import { getAllShelves } from "./getAllShelves";
import { putUpAssortment } from "./putUpAssortment";
import { takeDownAssortment } from "./takeDownAssortment";
import { takeDownOldestAssortmentByDefinition } from "./takeDownOldestAssortmentByDefinition";
import { getNextAssortmentToBeTakenDownByDefinition } from "./getNextAssortmentToBeTakenDownByDefinition";
import { putUpAssortmentAutomatically } from "./putUpAssortmentAutomatically";

export const storageRouter = createRouter({
	createShelf,
	importShelves,
	getShelf,
	updateShelf,
	deleteShelf,
	createAssortment,
	importAssortment,
	getAssortment,
	updateAssortment,
	deleteAssortment,
	getAllShelves,
	putUpAssortment,
	takeDownAssortment,
	takeDownOldestAssortmentByDefinition,
	getNextAssortmentToBeTakenDownByDefinition,
	putUpAssortmentAutomatically,
});
