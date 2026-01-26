import { startTaskByNameDTOSchema } from "@/server/scheduler/dto/StartTaskByNameDTO";
import { StartTaskByName } from "@/server/scheduler/use-cases/StartTaskByName";
import { procedure } from "../../init";

export const startTaskByName = procedure.input(startTaskByNameDTOSchema).mutation(async ({ ctx, input }) => {
	const action = new StartTaskByName();
	return await action.execute(input, ctx);
});
