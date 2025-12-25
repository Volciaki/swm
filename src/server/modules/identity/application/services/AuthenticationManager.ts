import { UUID } from "@/server/utils";
import { TwoFactorAuthenticationSession } from "../../domain/entities/TwoFactorAuthenticationSession";
import { User } from "../../domain/entities/User";

export interface AuthenticationManager {
    generateAuthenticationTokenForUser(user: User): string;
    setupTwoFactorAuthenticationSessionForUser(user: User): TwoFactorAuthenticationSession;
    getTwoFactorAuthenticationSessionByID(id: UUID): TwoFactorAuthenticationSession;
}
