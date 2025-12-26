import { User } from "../../domain/entities/User";

export interface AuthenticationManager {
    generateAuthenticationTokenForUser(user: User): string;
}
