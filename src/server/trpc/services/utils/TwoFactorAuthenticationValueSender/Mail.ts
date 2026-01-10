import { MailTwoFactorAuthenticationValueSender } from "@/server/modules/identity/infrastructure/services/MailTwoFactorAuthenticationValueSender";
import { GetServicesContext } from "../../context";

export const getMailTwoFactorAuthenticationValueSender = (ctx: GetServicesContext): MailTwoFactorAuthenticationValueSender => {
	return new MailTwoFactorAuthenticationValueSender();
}
