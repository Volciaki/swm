import { createRouter } from "../../init";

import { createUser } from "./createUser";
import { deleteUser } from "./deleteUser";
import { listUsers } from "./listUsers";
import { login } from "./login";
import { passwordReset } from "./passwordReset";
import { requestPasswordReset } from "./requestPasswordReset";
import { twoFactorAuthentication } from "./twoFactorAuthentication";
import { getSession } from "./getSession";
import { logout } from "./logout";
import { updateUser } from "./updateUser";
import { getUser } from "./getUser";

export const identityRouter = createRouter({
	createUser,
	deleteUser,
	listUsers,
	login,
	passwordReset,
	requestPasswordReset,
	twoFactorAuthentication,
	getSession,
	logout,
	updateUser,
	getUser,
});
