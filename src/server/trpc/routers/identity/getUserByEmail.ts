import type { PublicUserDTO } from "@/server/modules/identity/application/dto/shared/PublicUserDTO";
import { getUserByEmailDTOSchema } from "@/server/modules/identity/application/dto/GetUserByEmailDTO";
import { GetUserByEmail } from "@/server/modules/identity/application/use-cases/GetUserByEmail";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const getUserByEmail = procedure.input(getUserByEmailDTOSchema).query<PublicUserDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);

	const userRepository = services.repositories.user.db;

	const action = new GetUserByEmail(userRepository);
	return await action.execute(input);
});
