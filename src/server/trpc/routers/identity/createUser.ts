import { CreateUser } from "@/server/modules/identity/application/use-cases/CreateUser";
import { UserDTO } from "@/server/utils";
import { createUserDTOSchema } from "@/server/modules/identity/application/dto/CreateUserDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const createUser = procedure.input(createUserDTOSchema).mutation<UserDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);

	const userRepository = services.repositories.user.db;
	const stringHasher = services.utils.stringHasher.node;
	const uuidManager = services.utils.uuidManager.default;

	const action = new CreateUser(userRepository, stringHasher, uuidManager);
	return await action.execute(input, ctx.user ?? undefined);
})
