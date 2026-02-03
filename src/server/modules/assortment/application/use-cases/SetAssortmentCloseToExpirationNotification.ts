import type { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import type { SetAssortmentCloseToExpirationNotificationDTO } from "../dto/SetAssortmentCloseToExpirationNotificationDTO";
import type { AssortmentHelper } from "../helpers/AssortmentHelper";
import type { AssortmentDefinitionUtilities } from "../services/AssortmentDefinitionUtilities";

export class SetAssortmentCloseToExpirationNotification {
	constructor(
		private readonly assortmentHelper: AssortmentHelper,
		private readonly assortmentDefinitionUtilities: AssortmentDefinitionUtilities,
		private readonly assortmentRepository: AssortmentRepository
	) {}

	async execute(dto: SetAssortmentCloseToExpirationNotificationDTO) {
		const assortment = await this.assortmentHelper.getByIdStringOrThrow(
			dto.id,
			this.assortmentDefinitionUtilities.definitionGetter
		);

		assortment.isCloseToExpirationNotification = dto.notification;
		await this.assortmentRepository.update(assortment);
	}
}
