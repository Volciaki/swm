import type { User } from "../../domain/entities/User";
import type { AuthenticationPayloadDTO } from "../dto/AuthenticationPayload";

export interface AuthenticationManager<Payload extends AuthenticationPayloadDTO = AuthenticationPayloadDTO> {
	generateAuthenticationTokenForUser(user: User): string;
	generateAuthenticationPayloadForUser(user: User): Payload;
	decodeAuthenticationToken(token: string): Promise<Payload>;
}
