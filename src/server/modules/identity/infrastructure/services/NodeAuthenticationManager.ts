import { environment } from "@/server/environment";
import { AuthenticationManager } from "../../application/services/AuthenticationManager";
import { User } from "../../domain/entities/User";
import { SignOptions, Secret, sign, verify } from "jsonwebtoken";
import { InvalidAuthenticationTokenError } from "../../application/errors/InvalidAuthenticationTokenError";
import { AuthenticationPayloadDTO } from "../../application/dto/AuthenticationPayload";

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
