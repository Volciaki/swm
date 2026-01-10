import { TwoFactorAuthenticationSession } from "../../domain/entities/TwoFactorAuthenticationSession";
import { User } from "../../domain/entities/User";

export interface TwoFactorAuthenticationValueSender {
    deliverToUser(user: User, authenticationSession: TwoFactorAuthenticationSession): Promise<void>;
};
