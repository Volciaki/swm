import { UUID } from "@/server/utils";
import { Assortment } from "../../domain/entities/Assortment";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { AssortmentNotFoundError } from "../errors/AssortmentNotFound";

export interface AssortmentHelper {
    getByIdStringOrThrow(id: string): Promise<Assortment>;
};

export class DefaultAssortmentHelper implements AssortmentHelper {
    constructor(private readonly assortmentRepository: AssortmentRepository) {}

    async getByIdStringOrThrow(id: string) {
        const assortmentId = UUID.fromString(id);
        const assortment = await this.assortmentRepository.getById(assortmentId);

        if (assortment === null) throw new AssortmentNotFoundError(assortmentId);

        return assortment;
    }
}
