import { createRouter } from "../../init";

import { take } from "./take";
import { applyById } from "./applyById";

export const backupsRouter = createRouter({
	take,
	applyById,
});
