import { createRouter, createCallerFactory } from "./init";
import {
	identityRouter,
	notificationsRouter,
	storageRouter,
	reportsRouter,
	scheduleRouter,
	backupsRouter,
} from "./routers";

export const appRouter = createRouter({
	identity: identityRouter,
	storage: storageRouter,
	notifications: notificationsRouter,
	reports: reportsRouter,
	schedule: scheduleRouter,
	backups: backupsRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
