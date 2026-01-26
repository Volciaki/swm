import { MailTwoFactorAuthenticationValueSender } from "@/server/modules/identity/infrastructure/services/MailTwoFactorAuthenticationValueSender";
import type { GetServicesContext } from "../../context";

export const getMailTwoFactorAuthenticationValueSender = (
	ctx: GetServicesContext
): MailTwoFactorAuthenticationValueSender => {
	return new MailTwoFactorAuthenticationValueSender();
};
