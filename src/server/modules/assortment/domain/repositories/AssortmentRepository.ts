import { UUID } from "@/server/utils";
import { Assortment } from "../entities/Assortment";

export interface AssortmentRepository {
    create(assortment: Assortment): Promise<void>;
    update(assortment: Assortment): Promise<void>;
    delete(assortment: Assortment): Promise<void>;
    getById(id: UUID): Promise<Assortment | null>;
    getAll(): Promise<Assortment[]>;
};
