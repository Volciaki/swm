import { GetServicesContext } from "../context";
import { getUserRepositories } from "./User";
import { getTwoFactorAuthenticationSessionRepositories } from "./TwoFactorAuthenticationSession";

export const getRepositories = (ctx: GetServicesContext) => {
	return {
		user: getUserRepositories(ctx),
		twoFactorAuthenticationSession: getTwoFactorAuthenticationSessionRepositories(ctx),
	};
};
