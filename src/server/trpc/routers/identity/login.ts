import { loginDTOSchema } from "@/server/modules/identity/application/dto/LoginDTO";
import { LoginResponseDTO } from "@/server/modules/identity/application/dto/LoginResponseDTO";
import { Login } from "@/server/modules/identity/application/use-cases/Login";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const login = procedure.input(loginDTOSchema).mutation<LoginResponseDTO>(async ({ input, ctx }) => {
    const services = getServices(ctx);
    const userRepository = services.repositories.user.db;
    const twoFactorAuthenticationSessionRepository = services.repositories.twoFactorAuthenticationSession.db;
    const stringHasher = services.utils.stringHasher.node;
    const authenticationManager = services.utils.authenticationManager.node;
    const uuidManager = services.utils.uuidManager.default;
    const twoFactorAuthenticationValueGenerator = services.utils.twoFactorAuthenticationValueGenerator.node;
    const twoFactorAuthenticationValueSender = services.utils.twoFactorAuthenticationValueSender.mail;

    const action = new Login(
        userRepository,
        twoFactorAuthenticationSessionRepository,
        stringHasher,
        authenticationManager,
        uuidManager,
        twoFactorAuthenticationValueGenerator,
        twoFactorAuthenticationValueSender,
    );
    return await action.execute(input, ctx.user ?? undefined);
});
