import { getScheduler } from "..";
import { StartTaskByNameDTO } from "../dto/StartTaskByNameDTO";

export class StartTaskByName {
	constructor() {}

	async execute(dto: StartTaskByNameDTO) {
		const scheduler = await getScheduler(dto.authenticationPassphrase);
		await scheduler.runTask(dto.name);
	}
}
