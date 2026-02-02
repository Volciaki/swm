import { createRouter } from "../../init";

import { take } from "./take";
import { applyById } from "./applyById";
import { getAll } from "./getAll";
import { getSettings } from "./getSettings";
import { setSettings } from "./setSettings";

export const backupsRouter = createRouter({
	take,
	applyById,
	getAll,
	getSettings,
	setSettings,
});
