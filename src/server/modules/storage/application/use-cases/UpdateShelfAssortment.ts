import { UnauthorizedError, UserDTO } from "@/server/utils";
import { GetAssortment } from "@/server/modules/assortment/application/use-cases/GetAssortment";
import { UpdateAssortment } from "@/server/modules/assortment/application/use-cases/UpdateAssortment";
import { ValidateShelf } from "@/server/modules/warehouse/application/use-cases/ValidateShelf";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { UpdateShelfAssortmentDTO } from "../dto/UpdateShelfAssortmentDTO";

export class UpdateShelfAssortment {
	constructor(
        private readonly getAssortmentAction: GetAssortment,
        private readonly updateAssortmentAction: UpdateAssortment,
        private readonly getAllAssortmentAction: GetAllAssortment,
        private readonly validateShelfAction: ValidateShelf,
	) {}

	async execute(dto: UpdateShelfAssortmentDTO, currentUser?: UserDTO) {
		if (!currentUser?.isAdmin) throw new UnauthorizedError();

		const assortment = await this.getAssortmentAction.execute({ id: dto.id });
		const newAssortment = await this.updateAssortmentAction.execute({ id: dto.id, newData: dto.newData }, currentUser);
		try {
			const allAssortment = await this.getAllAssortmentAction.execute();
			await this.validateShelfAction.execute({ id: assortment.shelfId, assortmentContext: allAssortment }, currentUser);
			return newAssortment;
		} catch (error) {
			await this.updateAssortmentAction.execute({ id: newAssortment.id, newData: assortment }, currentUser);

			throw error;
		}
	}
}
