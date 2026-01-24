import { GetServicesContext } from "@/server/trpc/services/context";
import { getScheduler } from "..";
import { StartTaskByNameDTO } from "../dto/StartTaskByNameDTO";

export class StartTaskByName {
	constructor() {}

	async execute(dto: StartTaskByNameDTO, ctx: GetServicesContext) {
		const scheduler = await getScheduler(dto.authenticationPassphrase, ctx);
		await scheduler.runTask(dto.name);
	}
}
