import { Logout } from "@/server/modules/identity/application/use-cases/Logout";
import { procedure } from "../../init";

export const logout = procedure.mutation<void>(async ({ ctx }) => {
	const action = new Logout();

	const cookie = action.getCookie();
	ctx.cookie = cookie;

	return;
});
