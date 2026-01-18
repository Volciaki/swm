import { ListUsersResponseDTO } from "@/server/modules/identity/application/dto/ListUsersResponseDTO";
import { ListUsers } from "@/server/modules/identity/application/use-cases/ListUsers";
import { procedure } from "../../init";
import { getServices } from "../../services";

export const listUsers = procedure.query<ListUsersResponseDTO>(async ({ ctx }) => {
	const services = getServices(ctx);

	const userRepository = services.repositories.user.db;

	const action = new ListUsers(userRepository);
	return await action.execute();
});
