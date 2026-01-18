import { UUID } from "@/server/utils";
import { Assortment } from "../entities/Assortment";
import { FileReference } from "@/server/utils/files/domain/entities/FileReference";

export type FileContextByIDGetter = (id: UUID) => Promise<FileReference>;

export interface AssortmentRepository {
    create(assortment: Assortment): Promise<void>;
    update(assortment: Assortment): Promise<void>;
    delete(assortment: Assortment): Promise<void>;
    getById(id: UUID, getFileContextById: FileContextByIDGetter): Promise<Assortment | null>;
    getAll(getFileContextById: FileContextByIDGetter): Promise<Assortment[]>;
};
