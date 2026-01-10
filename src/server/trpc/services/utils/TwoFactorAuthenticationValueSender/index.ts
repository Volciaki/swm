import { GetServicesContext } from "../../context";
import { getMailTwoFactorAuthenticationValueSender } from "./Mail";

export const getTwoFactorAuthenticationValueSenderServices = (ctx: GetServicesContext) => {
	return {
		mail: getMailTwoFactorAuthenticationValueSender(ctx),
	};
}
