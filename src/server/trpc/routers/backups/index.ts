import { createRouter } from "../../init";

import { take } from "./take";
import { applyById } from "./applyById";
import { getAll } from "./getAll";
import { getBackupSettings } from "./getBackupSettings";
import { setBackupSettings } from "./setBackupSettings";

export const backupsRouter = createRouter({
	take,
	applyById,
	getAll,
	getBackupSettings,
	setBackupSettings,
});
