import "server-only";

import { cache } from "react";
import { createTRPCContext } from '@/server/trpc/init';
import { createCaller } from '@/server/trpc/app';

const getContext = cache(() => createTRPCContext())
export const apiServer = createCaller(getContext);
