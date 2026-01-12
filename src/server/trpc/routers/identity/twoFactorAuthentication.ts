import { AuthenticationTokenResponseDTO } from "@/server/modules/identity/application/dto/LoginResponseDTO";
import { TwoFactorAuthentication } from "@/server/modules/identity/application/use-cases/TwoFactorAuthentication";
import { twoFactorAuthenticationDTOSchema } from "@/server/modules/identity/application/dto/TwoFactorAuthenticationDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const twoFactorAuthentication = procedure.input(twoFactorAuthenticationDTOSchema).mutation<AuthenticationTokenResponseDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);

	const userRepository = services.repositories.user.db;
	const twoFactorAuthenticationSessionRepository = services.repositories.twoFactorAuthenticationSession.db;
	const authenticationManager = services.utils.authenticationManager.node;

	const action = new TwoFactorAuthentication(
		userRepository,
		twoFactorAuthenticationSessionRepository,
		authenticationManager
	);
	return await action.execute(input, ctx.user ?? undefined);
})
