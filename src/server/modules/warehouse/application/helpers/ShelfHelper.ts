import { UUID } from "@/server/utils";
import { Shelf } from "../../domain/entities/Shelf";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { ShelfNotFoundError } from "../errors/ShelfNotFoundError";

export interface ShelfHelper {
    getByIdStringOrThrow(id: string): Promise<Shelf>;
};

export class DefaultAssortmentHelper implements ShelfHelper {
    constructor(private readonly shelfRepository: ShelfRepository) {}

    async getByIdStringOrThrow(id: string) {
        const shelfId = UUID.fromString(id);
        const shelf = await this.shelfRepository.getById(shelfId);

        if (shelf === null) throw new ShelfNotFoundError(shelfId);

        return shelf;
    }
}
