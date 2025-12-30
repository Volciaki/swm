import { EnvironmentType } from "@/server/environment/type";
import { environment } from "@/server/environment";
import { EmailMessage } from "./entity";
import { EmailManager } from "./service";
import nodemailer from "nodemailer";

export class DefaultEmailManager implements EmailManager {
    async send(message: EmailMessage): Promise<void> {
        const transporter = nodemailer.createTransport({
            // TODO: add all those values to the environment interface.
            host: environment.mail.host,
            port: environment.mail.port,
            secure: environment.mail.sslEnabled,
            auth: environment.type === EnvironmentType.DEVELOPMENT
                ? undefined
                : {
                    user: environment.mail.user.name,
                    pass: environment.mail.user.password,
                },
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
