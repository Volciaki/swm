import "server-only";

import { createTRPCContext } from "@/server/trpc/init";
import { createCaller } from "@/server/trpc/app";

export const apiServer = createCaller(createTRPCContext);
