import { createRouter } from "../../init";

import { getAll } from "./getAll";

export const notificationsRouter = createRouter({
	getAll,
});
