import { GetServicesContext } from "../context";
import { getUserRepositories } from "./User";
import { getTwoFactorAuthenticationSessionRepositories } from "./TwoFactorAuthenticationSession";
import { getShelfRepositories } from "./Shelf";
import { getAssortmentRepositories } from "./Assortment";
import { getFileReferenceRepositories } from "./FileReference";

export const getRepositories = (ctx: GetServicesContext) => {
	return {
		user: getUserRepositories(ctx),
		twoFactorAuthenticationSession: getTwoFactorAuthenticationSessionRepositories(ctx),
		shelf: getShelfRepositories(ctx),
		assortment: getAssortmentRepositories(ctx),
		fileReference: getFileReferenceRepositories(ctx),
	};
};
