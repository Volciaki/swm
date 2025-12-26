import { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { User } from "../../domain/entities/User";
import { TwoFactorAuthenticationSessionRepository } from "../../domain/repositories/TwoFactorAuthenticationSessionRepository";
import { DBTwoFactorAuthenticationSession } from "../entities/DBTwoFactorAuthenticationSession";
import { TwoFactorAuthenticationSessionMapper } from "../mappers/TwoFactorAuthenticationSessionMapper";

export class DBTwoFactorAuthenticationSessionRepository implements TwoFactorAuthenticationSessionRepository {
    constructor(private readonly db: Repository<DBTwoFactorAuthenticationSession>) {}

    async getById(id: UUID) {
        const dbObject = await this.db.findOneBy({ id: id.value });

        if (dbObject === null) return null;

        return TwoFactorAuthenticationSessionMapper.fromDB(dbObject);
    }

    async setupForUser(user: User, newId: UUID, value: string) {
        const dbObject = new DBTwoFactorAuthenticationSession();

        dbObject.id = newId.value;
        dbObject.userId = user.id.value;
        dbObject.value = value;

        await this.db.save(dbObject);
        return TwoFactorAuthenticationSessionMapper.fromDB(dbObject);
    }
}
