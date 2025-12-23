import { initTRPC } from "@trpc/server";
import { cache } from "react";

export const createTRPCContext = cache(async () => {
    // TODO: add DB integration here...
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return {};
});

const t = initTRPC.create();

export const createRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const procedure = t.procedure;
