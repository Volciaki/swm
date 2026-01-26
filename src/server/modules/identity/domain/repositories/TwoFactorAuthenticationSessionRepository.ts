import type { UUID } from "@/server/utils";
import type { TwoFactorAuthenticationSession } from "../entities/TwoFactorAuthenticationSession";
import type { User } from "../entities/User";

export interface TwoFactorAuthenticationSessionRepository {
	setupForUser(user: User, newId: UUID, value: string): Promise<TwoFactorAuthenticationSession>;
	getById(id: UUID): Promise<TwoFactorAuthenticationSession | null>;
	delete(session: TwoFactorAuthenticationSession): Promise<void>;
}
