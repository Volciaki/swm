import { z } from "zod";
import { procedure, createRouter, createCallerFactory } from "./init";

export const appRouter = createRouter({
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
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
