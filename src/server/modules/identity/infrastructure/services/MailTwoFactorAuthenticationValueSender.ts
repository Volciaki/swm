import { DefaultEmailManager, EmailMessage } from "@/server/utils";
import type { TwoFactorAuthenticationValueSender } from "../../application/services/TwoFactorAuthenticationValueSender";
import type { TwoFactorAuthenticationSession } from "../../domain/entities/TwoFactorAuthenticationSession";
import type { User } from "../../domain/entities/User";

export class MailTwoFactorAuthenticationValueSender implements TwoFactorAuthenticationValueSender {
	async deliverToUser(user: User, authenticationSession: TwoFactorAuthenticationSession) {
		const mailManager = new DefaultEmailManager();
		const message = EmailMessage.create(
			user.email,
			"Your 2FA Code - Volciaki Magazyn",
			`
			<table width="50%" cellpadding="0" cellspacing="0" border="0" align="center" style="border-radius:10px; border:5px solid #455D6C; background-color: #A7A7A7;">
				<tr>
					<td align="center">
						<h1 style="font-size:4rem;">Kod dwuetapowej weryfikacji</h1>
						<p style="font-size:2rem;">Przesylamy kod dwuetapowej weryfikacji</p>
						<h1 style="padding:4px; width:25%; border-radius:10px; border: 5px solid #455D6C; background-color:#262626; font-size:4rem; color:#FFF;">${authenticationSession.value}</h1>
						<p style="font-size:2rem;">Prosimy wprowadzic podany kod w odpowiednie pole</p>
					</td>
				</tr>
			</table>
            `,
			`Your 2FA code is:\n\n${authenticationSession.value}\n\nYou may use it to finish logging in, or reset your password.`
		);
		await mailManager.send(message);
	}
}
