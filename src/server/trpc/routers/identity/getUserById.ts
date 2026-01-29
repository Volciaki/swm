import type { PublicUserDTO } from "@/server/modules/identity/application/dto/shared/PublicUserDTO";
import { GetUserById } from "@/server/modules/identity/application/use-cases/GetUserById";
import { getUserByIdDTOSchema } from "@/server/modules/identity/application/dto/GetUserByIdDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const getUserById = procedure.input(getUserByIdDTOSchema).query<PublicUserDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);

	const userRepository = services.repositories.user.db;

	const action = new GetUserById(userRepository);
	return await action.execute(input);
});
