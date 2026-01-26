import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import type { SetAssortmentCloseToExpirationNotificationDTO } from "../dto/SetAssortmentCloseToExpirationNotificationDTO";
import type { AssortmentHelper } from "../helpers/AssortmentHelper";
import type { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class SetAssortmentCloseToExpirationNotification {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper,
		private readonly assortmentRepository: AssortmentRepository
	) {}

	async execute(dto: SetAssortmentCloseToExpirationNotificationDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);

		assortment.isCloseToExpirationNotification = dto.notification;
		await this.assortmentRepository.update(assortment);
	}
}
