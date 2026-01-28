import { generateAuthCookieByTokenValue, type UserDTO, type UUIDManager } from "@/server/utils";
import { Email } from "../../domain/entities/Email";
import { AlreadyLoggedInError } from "../../domain/errors/AlreadyLoggedInError";
import { WrongPasswordError } from "../../domain/errors/WrongPasswordError";
import type { TwoFactorAuthenticationSessionRepository } from "../../domain/repositories/TwoFactorAuthenticationSessionRepository";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { LoginDTO } from "../dto/LoginDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import type { AuthenticationManager } from "../services/AuthenticationManager";
import type { StringHasher } from "../services/StringHasher";
import type { TwoFactorAuthenticationValueGenerator } from "../services/TwoFactorAuthenticationValueGenerator";
import type { TwoFactorAuthenticationValueSender } from "../services/TwoFactorAuthenticationValueSender";
import type { LoginResponseDTO } from "../dto/LoginResponseDTO";

export class Login {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly twoFactorAuthenticationSessionRepository: TwoFactorAuthenticationSessionRepository,
		private readonly stringHasher: StringHasher,
		private readonly authenticationManager: AuthenticationManager,
		private readonly uuidManager: UUIDManager,
		private readonly twoFactorAuthenticationValueGenerator: TwoFactorAuthenticationValueGenerator,
		private readonly twoFactorAuthenticationValueSender?: TwoFactorAuthenticationValueSender
	) {}

	async execute(dto: LoginDTO, currentUser?: UserDTO): Promise<LoginResponseDTO> {
		if (currentUser) throw new AlreadyLoggedInError();

		const email = Email.fromString(dto.email);
		const user = await this.userRepository.getByEmail(email);
		if (!user) throw new UserNotFoundError({ fieldName: "mail", value: dto.email });

		const passwordMatches = await this.stringHasher.verify(dto.passwordRaw, user.passwordHash);
		if (!passwordMatches) throw new WrongPasswordError({ password: dto.passwordRaw, email: dto.email });

		if (user.twoFactorAuthenticationEnabled) {
			const twoFactorAuthenticationValue = this.twoFactorAuthenticationValueGenerator.generate();
			const authenticationSession = await this.twoFactorAuthenticationSessionRepository.setupForUser(
				user,
				this.uuidManager.generate(),
				twoFactorAuthenticationValue
			);

			if (this.twoFactorAuthenticationValueSender)
				await this.twoFactorAuthenticationValueSender.deliverToUser(user, authenticationSession);

			return { authenticationId: authenticationSession.id.value };
		}

		return {
			authenticationToken: this.authenticationManager.generateAuthenticationTokenForUser(user),
		};
	}

	getCookieByDTO(dto: LoginResponseDTO): string | null {
		if (!("authenticationToken" in dto)) return null;

		const cookie = generateAuthCookieByTokenValue(dto.authenticationToken);
		return cookie;
	}
}
