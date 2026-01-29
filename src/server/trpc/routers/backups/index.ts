import { createRouter } from "../../init";

import { take } from "./take";
import { applyById } from "./applyById";
import { getAll } from "./getAll";

export const backupsRouter = createRouter({
	take,
	applyById,
	getAll,
});
