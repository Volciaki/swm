import { UUID } from "@/server/utils";
import { Shelf } from "../entities/Shelf";
import { AssortmentVO } from "../vo/AssortmentVO";

export interface ShelfRepository {
    create(shelf: Shelf): Promise<void>;
    update(shelf: Shelf): Promise<void>;
    delete(shelf: Shelf): Promise<void>;
    // `AssortmentContext` has to be provided if you're planning to access cells' assortment.
    // The reason is that we can't just query a repository from another bounded context.
    getById(id: UUID, assortmentContext?: AssortmentVO[]): Promise<Shelf | null>;
    getAll(assortmentContext?: AssortmentVO[]): Promise<Shelf[]>;
};
