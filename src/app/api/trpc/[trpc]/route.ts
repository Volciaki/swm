import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { createTRPCContext } from "@/server/trpc/init";
import { appRouter } from "@/server/trpc/app";

const handler = (req: Request) => {
	const res = fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: createTRPCContext,
		responseMeta: ({ ctx, errors }) => {
			const headers: HeadersInit = {};

			if (ctx?.cookie) headers["Set-Cookie"] = ctx.cookie;

			let status = 200;
			if (errors[0]) status = getHTTPStatusCodeFromError(errors[0]);

			return { headers, status };
		},
	});
	return res;
};

export { handler as GET, handler as POST };
