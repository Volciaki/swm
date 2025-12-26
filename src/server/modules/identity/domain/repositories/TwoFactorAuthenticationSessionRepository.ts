import { UUID } from "@/server/utils";
import { TwoFactorAuthenticationSession } from "../entities/TwoFactorAuthenticationSession";
import { User } from "../entities/User";

export interface TwoFactorAuthenticationSessionRepository {
    setupForUser(user: User, newId: UUID, value: string): Promise<TwoFactorAuthenticationSession>;
    getById(id: UUID): Promise<TwoFactorAuthenticationSession | null>;
};
