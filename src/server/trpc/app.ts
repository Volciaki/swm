import { z } from "zod";
import { procedure, createRouter, createCallerFactory } from "./init";
import { identityRouter } from "./routers";

export const appRouter = createRouter({
	// TODO: Dawid, remove this when you're ready xD
	hello: procedure
		.input(
			z.object({
				text: z.string(),
			}),
		)
		.query((opts) => {
			return {
				greeting: `I was fetched from the server! This data has been given to me: ${opts.input.text}`,
			};
		}),
	identity: identityRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
