import { UUID } from "@/server/utils";
import { AuthenticationTokenResponseDTO } from "../dto/LoginResponseDTO";
import { TwoFactorAuthenticationDTO } from "../dto/TwoFactorAuthenticationDTO";
import { AuthenticationManager } from "../services/AuthenticationManager";
import { WrongTwoFactorAuthenticationValueError } from "../../domain/errors/WrongTwoFactorAuthenticationValue";
import { AlreadyLoggedInError } from "../../domain/errors/AlreadyLoggedInError";
import { User } from "../../domain/entities/User";

export class TwoFactorAuthentication {
    constructor(private readonly authenticationManager: AuthenticationManager) {}

    async execute(dto: TwoFactorAuthenticationDTO, currentUser?: User): Promise<AuthenticationTokenResponseDTO> {
        if (currentUser) throw new AlreadyLoggedInError();

        const authenticationID = UUID.fromString(dto.authenticationId);
        const authentication = this.authenticationManager.getTwoFactorAuthenticationSessionByID(authenticationID);

        if (dto.value !== authentication.value) throw new WrongTwoFactorAuthenticationValueError(dto.value);

        return {
            authenticationToken: this.authenticationManager.generateAuthenticationTokenForUser(authentication.user)
        };
    }
}
