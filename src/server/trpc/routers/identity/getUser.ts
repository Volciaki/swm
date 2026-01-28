import { GetUser } from "@/server/modules/identity/application/use-cases/GetUser";
import { getUserDTOSchema } from "@/server/modules/identity/application/dto/GetUserDTO";
import type { PublicUserDTO } from "@/server/modules/identity/application/dto/shared/PublicUserDTO";
import { getServices } from "../../services";
import { procedure } from "../../init";

export const getUser = procedure.input(getUserDTOSchema).mutation<PublicUserDTO>(async ({ input, ctx }) => {
	const services = getServices(ctx);

	const userRepository = services.repositories.user.db;

	const action = new GetUser(userRepository);
	return await action.execute(input);
});
