import type { UUID } from "@/server/utils";
import type { Assortment } from "../entities/Assortment";
import type { DefinitionContextByIdGetter } from "../../application/helpers/AssortmentHelper";

export interface AssortmentRepository {
	create(assortment: Assortment): Promise<void>;
	update(assortment: Assortment): Promise<void>;
	delete(assortment: Assortment): Promise<void>;
	getById(id: UUID, getDefinitionContextById: DefinitionContextByIdGetter): Promise<Assortment | null>;
	getAll(getDefinitionContextById: DefinitionContextByIdGetter): Promise<Assortment[]>;
}
