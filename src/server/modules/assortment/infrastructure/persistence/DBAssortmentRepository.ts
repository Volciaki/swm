import { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { AssortmentRepository } from "../../domain/repositories/AssortmentRepository";
import { DBAssortment } from "../entities/DBAssortment";
import { Assortment } from "../../domain/entities/Assortment";
import { AssortmentMapper } from "../mappers/AssortmentMapper";

// TODO: This repository has been implemented very similarly to DBUser.
// I should probably consider somehow abstracting away the common CRUD operations.
export class DBAssortmentRepository implements AssortmentRepository {
    constructor(private readonly db: Repository<DBAssortment>) {}

    async create(assortment: Assortment) {
        const dbAssortment = AssortmentMapper.fromAssortmentToDBAssortment(assortment);
        await this.db.save(dbAssortment);
    }

    async update(assortment: Assortment) {
        // TypeORM's `save` method acts as UPSERT if the primary key exists.
        return await this.create(assortment);
    }

    async delete(assortment: Assortment) {
        const dbAssortment = await this.db.findOneBy({ id: assortment.id.value });

        if (dbAssortment === null) return;

        await this.db.remove(dbAssortment);
    }

    async getById(id: UUID) {
        const dbAssortment = await this.db.findOneBy({ id: id.value });

        if (dbAssortment === null) return null;

        return AssortmentMapper.fromDBAssortmentToAssortment(dbAssortment);
    }

    async getAll() {
        const dbAssortments = await this.db.find();
        return dbAssortments.map((assortment) => AssortmentMapper.fromDBAssortmentToAssortment(assortment));
    }
}
