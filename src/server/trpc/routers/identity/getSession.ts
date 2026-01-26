import type { UserDTO } from "@/server/utils";
import { procedure } from "../../init";

type Session = {
	user: UserDTO | null;
};

export const getSession = procedure.query<Session>(async ({ ctx }) => {
	return { user: ctx.user };
});
