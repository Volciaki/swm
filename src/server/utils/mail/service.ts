import { EmailMessage } from "./entity";

export interface EmailManager {
    send(message: EmailMessage): Promise<void>;
};
