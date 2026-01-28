import type { PublicUserDTO } from "@/server/modules/identity/application/dto/shared/PublicUserDTO";
import { UpdateUser } from "@/server/modules/identity/application/use-cases/UpdateUser";
import { updateUserDTOSchema } from "@/server/modules/identity/application/dto/UpdateUserDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const updateUser = procedure.input(updateUserDTOSchema).mutation<PublicUserDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);

	const userRepository = services.repositories.user.db;
	const stringHasher = services.utils.stringHasher.node;

	const action = new UpdateUser(userRepository, stringHasher);
	return await action.execute(input, ctx.user ?? undefined);
});
