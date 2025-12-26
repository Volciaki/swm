import { UUID } from "@/server/utils";
import { AuthenticationManager } from "../../application/services/AuthenticationManager";
import { TwoFactorAuthenticationSession } from "../../domain/entities/TwoFactorAuthenticationSession";
import { User } from "../../domain/entities/User";

export class NodeAuthenticationManager implements AuthenticationManager {
    generateAuthenticationTokenForUser(user: User): string {
        
    }

    getTwoFactorAuthenticationSessionByID(id: UUID): TwoFactorAuthenticationSession {
        
    }

    setupTwoFactorAuthenticationSessionForUser(user: User): TwoFactorAuthenticationSession {
        
    }
}
