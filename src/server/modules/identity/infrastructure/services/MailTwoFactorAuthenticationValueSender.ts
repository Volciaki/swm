import { DefaultEmailManager, EmailMessage } from "@/server/utils";
import { TwoFactorAuthenticationValueSender } from "../../application/services/TwoFactorAuthenticationValueSender";
import { TwoFactorAuthenticationSession } from "../../domain/entities/TwoFactorAuthenticationSession";
import { User } from "../../domain/entities/User";

export class MailTwoFactorAuthenticationValueSender implements TwoFactorAuthenticationValueSender {
    async deliverToUser(user: User, authenticationSession: TwoFactorAuthenticationSession) {
        const mailManager = new DefaultEmailManager();
        const message = EmailMessage.create(
            user.email,
            "Your 2FA Code - Volciaki Magazyn",
            `Your 2FA code is:\n\n${authenticationSession.value}\n\nYou may use it to finish logging in, or reset your password.`
        );
        await mailManager.send(message);
    }
}
