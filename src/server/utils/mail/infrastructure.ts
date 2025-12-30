import { EnvironmentType } from "@/server/environment/type";
import { environment } from "@/server/environment";
import { EmailMessage } from "./entity";
import { EmailManager } from "./service";
import nodemailer from "nodemailer";

export class DefaultEmailManager implements EmailManager {
    async send(message: EmailMessage): Promise<void> {
        const transporter = nodemailer.createTransport({
            // TODO: add all those values to the environment interface.
            host: "",
            port: 1,
            secure: true,
            auth: environment.type === EnvironmentType.DEVELOPMENT
                ? undefined
                : {
                    user: "",
                    pass: "",
                },
        });
        await transporter.sendMail({
            from: "Volciaki Magazyn <volciaki@khenzii.dev>",
            to: message.to.value,
            subject: message.subject,
            text: message.body,
        });
    }
}
