import type { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import type { UUID } from "@/server/utils";
import type { Assortment } from "../entities/Assortment";

export interface AssortmentRepository {
	create(assortment: Assortment): Promise<void>;
	update(assortment: Assortment): Promise<void>;
	delete(assortment: Assortment): Promise<void>;
	getById(id: UUID, getFileContextById: FileContextByIDGetter): Promise<Assortment | null>;
	getAll(getFileContextById: FileContextByIDGetter): Promise<Assortment[]>;
}
