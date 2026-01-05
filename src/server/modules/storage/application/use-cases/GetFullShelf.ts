import { GetFullShelfDTO } from "../dto/GetFullShelfDTO";
import { GetAllAssormtent } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetShelf } from "@/server/modules/warehouse/application/use-cases/GetShelf";

export class GetFullShelf {
    constructor(
        private readonly getAllAssortment: GetAllAssormtent,
        private readonly getShelf: GetShelf,
    ) {}

    async execute(dto: GetFullShelfDTO) {
        const assortments = await this.getAllAssortment.execute();
        return await this.getShelf.execute({
            id: dto.id,
            assortmentContext: assortments,
        });
    }
}
