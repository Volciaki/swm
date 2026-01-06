import { UUID } from "@/server/utils";
import { Shelf } from "../../domain/entities/Shelf";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfNotFoundError } from "../errors/ShelfNotFoundError";
import { AssortmentVO } from "../../domain/vo/AssortmentVO";

export interface ShelfHelper {
    getByIdStringOrThrow(id: string, assortmentContext?: AssortmentVO[]): Promise<Shelf>;
};

export class DefaultShelfHelper implements ShelfHelper {
    constructor(private readonly shelfRepository: ShelfRepository) {}

    async getByIdStringOrThrow(id: string, assortmentContext?: AssortmentVO[]) {
        const shelfId = UUID.fromString(id);
        const shelf = await this.shelfRepository.getById(shelfId, assortmentContext);

        if (shelf === null) throw new ShelfNotFoundError(shelfId);

        return shelf;
    }
}
