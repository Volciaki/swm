import { UUID } from "@/server/utils";
import { AuthenticationTokenResponseDTO } from "../dto/LoginResponseDTO";
import { TwoFactorAuthenticationDTO } from "../dto/TwoFactorAuthenticationDTO";
import { AuthenticationManager } from "../services/AuthenticationManager";
import { WrongTwoFactorAuthenticationValueError } from "../../domain/errors/WrongTwoFactorAuthenticationValue";

export class TwoFactorAuthentication {
    constructor(private readonly authenticationManager: AuthenticationManager) {}

    async execute(dto: TwoFactorAuthenticationDTO): Promise<AuthenticationTokenResponseDTO> {
        const authenticationID = UUID.fromString(dto.authenticationId);
        const authentication = this.authenticationManager.getTwoFactorAuthenticationSessionByID(authenticationID);

        if (dto.value !== authentication.value) throw new WrongTwoFactorAuthenticationValueError(dto.value);

        return {
            authenticationToken: this.authenticationManager.generateAuthenticationTokenForUser(authentication.user)
        };
    }
}
