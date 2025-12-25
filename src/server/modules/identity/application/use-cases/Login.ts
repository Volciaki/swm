import { Email } from "../../domain/entities/Email";
import { User } from "../../domain/entities/User";
import { AlreadyLoggedInError } from "../../domain/errors/AlreadyLoggedInError";
import { WrongPasswordError } from "../../domain/errors/WrongPasswordError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { LoginDTO } from "../dto/LoginDTO";
import { LoginResponseDTO } from "../dto/LoginResponseDTO";
import { AuthenticationManager } from "../services/AuthenticationManager";
import { StringHasher } from "../services/StringHasher";

export class Login {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly stringHasher: StringHasher,
        private readonly authenticationManager: AuthenticationManager,
    ) {}

    async execute(dto: LoginDTO, currentUser?: User): Promise<LoginResponseDTO> {
        if (currentUser) throw new AlreadyLoggedInError();

        const email = Email.fromString(dto.email);
        const user = await this.userRepository.getByEmail(email);

        const passwordMatches = this.stringHasher.verify(dto.passwordRaw, user.passwordHash);
        if (!passwordMatches) throw new WrongPasswordError(dto.passwordRaw, dto.email);

        if (user.twoFactorAuthenticationEnabled) {
            return {
                authenticationId: this.authenticationManager.setupTwoFactorAuthenticationSessionIDForUser(user)
            };
        } else {
            return {
                authenticationToken: this.authenticationManager.generateAuthenticationTokenForUser(user)
            };
        };
    }
}
