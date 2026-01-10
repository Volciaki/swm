import { DeleteUser } from "@/server/modules/identity/application/use-cases/DeleteUser";
import { deleteUserDTOSchema } from "@/server/modules/identity/application/dto/DeleteUserDTO";
import { procedure } from "../../init";
import { getServices } from "../../services";

export const deleteUser = procedure.input(deleteUserDTOSchema).mutation<void>(async ({ input, ctx }) => {
	const services = getServices(ctx);
	const userRepository = services.repositories.user.db;

	const action = new DeleteUser(userRepository);
	return await action.execute(input, ctx.user ?? undefined);
})
