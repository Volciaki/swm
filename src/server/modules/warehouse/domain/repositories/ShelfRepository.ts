import { UUID } from "@/server/utils";
import { Shelf } from "../entities/Shelf";

export interface ShelfRepository {
    create(shelf: Shelf): Promise<void>;
    update(shelf: Shelf): Promise<void>;
    delete(shelf: Shelf): Promise<void>;
    getById(id: UUID): Promise<Shelf | null>;
    getAll(): Promise<Shelf[]>;
};
