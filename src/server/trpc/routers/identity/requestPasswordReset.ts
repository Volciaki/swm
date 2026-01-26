import type { TwoFactorAuthenticationResponseDTO } from "@/server/modules/identity/application/dto/LoginResponseDTO";
import { RequestPasswordReset } from "@/server/modules/identity/application/use-cases/RequestPasswordReset";
import { requestPasswordResetDTOSchema } from "@/server/modules/identity/application/dto/RequestPasswordResetDTO";
import { procedure } from "../../init";
import { getServices } from "../../services";

export const requestPasswordReset = procedure
	.input(requestPasswordResetDTOSchema)
	.mutation<TwoFactorAuthenticationResponseDTO>(async ({ input, ctx }) => {
		const services = getServices(ctx);

		const userRepository = services.repositories.user.db;
		const twoFactorAuthenticationSessionRepository = services.repositories.twoFactorAuthenticationSession.db;
		const uuidManager = services.utils.uuidManager.default;
		const twoFactorAuthenticationValueGenerator = services.utils.twoFactorAuthenticationValueGenerator.node;
		const twoFactorAuthenticationValueSender = services.utils.twoFactorAuthenticationValueSender.mail;

		const action = new RequestPasswordReset(
			userRepository,
			twoFactorAuthenticationSessionRepository,
			uuidManager,
			twoFactorAuthenticationValueGenerator,
			twoFactorAuthenticationValueSender
		);
		return await action.execute(input, ctx.user ?? undefined);
	});
