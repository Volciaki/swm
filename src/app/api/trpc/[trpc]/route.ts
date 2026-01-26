import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/server/trpc/init";
import { appRouter } from "@/server/trpc/app";

const handler = (req: Request) => {
	const res = fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: createTRPCContext,
		responseMeta: ({ ctx }) => {
			const headers: HeadersInit = {};

			if (ctx?.cookie) headers["Set-Cookie"] = ctx.cookie;

			return { headers };
		},
	});
	return res;
};

export { handler as GET, handler as POST };
