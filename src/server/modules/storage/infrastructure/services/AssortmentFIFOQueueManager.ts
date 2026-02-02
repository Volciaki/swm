import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { AssortmentDTO } from "../../application/dto/shared/AssortmentDTO";
import type { FIFOQueueManager } from "../../application/services/FIFOQueueManager";

export class AssortmentFIFOQueueManager implements FIFOQueueManager<AssortmentDTO> {
	constructor(private readonly getAllAssortment: GetAllAssortment) {}

	private async getAll() {
		return await this.getAllAssortment.execute();
	}

	private async getDataToLookThrough(from?: AssortmentDTO[]) {
		const all = await this.getAll();
		return from ?? all;
	}

	async getOldest(from?: AssortmentDTO[]) {
		const dataToLookThrough = await this.getDataToLookThrough(from);
		return dataToLookThrough.sort((a, b) => a.storedAtTimestamp - b.storedAtTimestamp);
	}

	async getSingleOldest(from?: AssortmentDTO[]) {
		const oldest = await this.getOldest(from);
		return oldest[0] ?? null;
	}

	async getYoungest(from?: AssortmentDTO[]) {
		const dataToLookThrough = await this.getDataToLookThrough(from);
		return dataToLookThrough.sort((a, b) => b.storedAtTimestamp - a.storedAtTimestamp);
	}

	async getSingleYoungest(from?: AssortmentDTO[]) {
		const youngest = await this.getYoungest(from);
		return youngest[0] ?? null;
	}
}
