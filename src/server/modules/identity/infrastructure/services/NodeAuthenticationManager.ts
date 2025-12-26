import { environment } from "@/server/environment";
import { AuthenticationManager } from "../../application/services/AuthenticationManager";
import { User } from "../../domain/entities/User";
import { SignOptions, Secret, sign } from "jsonwebtoken";

export class NodeAuthenticationManager implements AuthenticationManager {
    generateAuthenticationTokenForUser(user: User): string {
        const secret: Secret = environment.authentication.secret;
        const options: SignOptions = {
            expiresIn: environment.authentication.cookie.expiresIn as unknown as number,
        };
        const payload = { userId: user.id.value };

        return sign(payload, secret, options);
    }
}
