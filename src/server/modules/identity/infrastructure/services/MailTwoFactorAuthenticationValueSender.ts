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
            `
                <div style="display: flex; justify-content: center; align-items:center; flex-direction: column; background-color: gray; width: 50%; margin: 0 auto">
	                <p style="font-size: 2rem; font-family: 'Arial', serif">This is your automatically generated 2FA code:</p>
	                <hr style="border: none; border-top: 2px solid Black; width:75%">
	                <p style="font-size: 3rem; font-family: 'Arial'; background-color: Gainsboro; border-radius: 10px; padding: 10px 15px">${authenticationSession.value}</p>
	                <hr style="border: none; border-top: 2px solid Black; width:75%">
	                <p style="font-size: 2rem; font-family: 'Arial', serif">You may use it to finish logging in, or reset your password.</p>
                </div>
            `,
            `Your 2FA code is:\n\n${authenticationSession.value}\n\nYou may use it to finish logging in, or reset your password.`,
        );
        await mailManager.send(message);
    }
}
