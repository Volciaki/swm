import { AuthenticationManager } from "../../application/services/AuthenticationManager";
import { User } from "../../domain/entities/User";
import { SignOptions, Secret, sign } from "jsonwebtoken";

export class NodeAuthenticationManager implements AuthenticationManager {
    generateAuthenticationTokenForUser(user: User): string {
        // TODO: replace this via `environment`.
        const secret: Secret = "...";
        const options: SignOptions = {
            // TODO: allow passing this via `environment` too.
            expiresIn: "30m",
        };
        const payload = { userId: user.id.value };

        return sign(payload, secret, options);
    }
}
