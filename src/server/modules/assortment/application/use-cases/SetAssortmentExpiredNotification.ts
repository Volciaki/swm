import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { SetAssortmentCloseToExpirationNotificationDTO } from "../dto/SetAssortmentCloseToExpirationNotificationDTO";
import { AssortmentHelper } from "../helpers/AssortmentHelper";
import { AssortmentFileHelper } from "../services/AssortmentFileHelper";

export class SetAssortmentExpiredNotification {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentFileHelper: AssortmentFileHelper,
		private readonly assortmentRepository: AssortmentRepository,
	) {}

	async execute(dto: SetAssortmentCloseToExpirationNotificationDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(dto.id, this.assortmentFileHelper.fileGetter);

		assortment.hasExpiredNotification = dto.notification;
		await this.assortmentRepository.update(assortment);
	}
};
