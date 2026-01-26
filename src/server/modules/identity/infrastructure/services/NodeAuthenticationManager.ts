import type { SignOptions, Secret } from "jsonwebtoken";
import { sign, verify } from "jsonwebtoken";
import { environment } from "@/server/environment";
import type { AuthenticationManager } from "../../application/services/AuthenticationManager";
import type { User } from "../../domain/entities/User";
import { InvalidAuthenticationTokenError } from "../../application/errors/InvalidAuthenticationTokenError";
import type { AuthenticationPayloadDTO } from "../../application/dto/AuthenticationPayload";

export class NodeAuthenticationManager implements AuthenticationManager<AuthenticationPayloadDTO> {
	generateAuthenticationTokenForUser(user: User) {
		const secret: Secret = environment.authentication.secret;
		const options: SignOptions = {
			expiresIn: environment.authentication.cookie.expiresIn as unknown as number,
		};
		const payload = this.generateAuthenticationPayloadForUser(user);

		return sign(payload, secret, options);
	}

	generateAuthenticationPayloadForUser(user: User) {
		return { userId: user.id.value };
	}

	async decodeAuthenticationToken(token: string) {
		return new Promise<AuthenticationPayloadDTO>((resolve, reject) => {
			verify(token, environment.authentication.secret, (err, decoded) => {
				if (err) return reject(new InvalidAuthenticationTokenError(token));

				resolve(decoded as AuthenticationPayloadDTO);
			});
		});
	}
}
