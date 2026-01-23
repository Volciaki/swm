import { createRouter } from "../../init";

import { startTaskByName } from "./startTaskByName";

export const scheduleRouter = createRouter({
	startTaskByName,
});
