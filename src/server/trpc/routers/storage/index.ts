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
import { createAssortmentCopy } from "./createAssortmentCopy";

export const storageRouter = createRouter({
	createShelf,
	importShelves,
	getShelf,
	updateShelf,
	deleteShelf,
	createAssortment,
	createAssortmentCopy,
	importAssortment,
	getAssortment,
	updateAssortment,
	deleteAssortment,
});
