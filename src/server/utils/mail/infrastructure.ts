import nodemailer from "nodemailer";
import { EnvironmentType } from "@/server/environment/type";
import { environment } from "@/server/environment";
import type { EmailMessage } from "./entity";
import type { EmailManager } from "./service";

export class DefaultEmailManager implements EmailManager {
	async send(message: EmailMessage): Promise<void> {
		// prettier-ignore
		const auth = environment.type === EnvironmentType.DEVELOPMENT
			? undefined
			: {
				user: environment.mail.user.name,
				pass: environment.mail.user.password,
			};
		const transporter = nodemailer.createTransport({
			host: environment.mail.host,
			port: environment.mail.port,
			secure: environment.mail.sslEnabled,
			auth,
		});
		await transporter.sendMail({
			from: "Volciaki Magazyn <volciaki@khenzii.dev>",
			to: message.to.value,
			subject: message.subject,
			html: message.html,
			text: message.text,
		});
	}
}
