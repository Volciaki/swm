import { PasswordReset } from "@/server/modules/identity/application/use-cases/PasswordReset";
import { passwordResetDTOSchema } from "@/server/modules/identity/application/dto/PasswordResetDTO";
import { procedure } from "../../init";
import { getServices } from "../../services";

export const passwordReset = procedure.input(passwordResetDTOSchema).mutation<void>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const userRepository = services.repositories.user.db;
	const twoFactorAuthenticationSessionRepository = services.repositories.twoFactorAuthenticationSession.db;
	const stringHasher = services.utils.stringHasher.node;

	const action = new PasswordReset(
		userRepository,
		twoFactorAuthenticationSessionRepository,
		stringHasher,
	);
	return await action.execute(input, ctx.user ?? undefined);
});
