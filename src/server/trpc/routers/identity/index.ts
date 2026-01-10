import { createRouter } from "../../init";

import { createUser } from "./createUser";
import { deleteUser } from "./deleteUser";
import { listUsers } from "./listUsers";
import { login } from "./login";
import { passwordReset } from "./passwordReset";
import { requestPasswordReset } from "./requestPasswordReset";
import { twoFactorAuthentication } from "./twoFactorAuthentication";

export const identityRouter = createRouter({
	createUser,
	deleteUser,
	listUsers,
	login,
	passwordReset,
	requestPasswordReset,
	twoFactorAuthentication,
});
