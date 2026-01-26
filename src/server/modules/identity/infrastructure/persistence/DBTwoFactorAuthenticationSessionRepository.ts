import type { Repository } from "typeorm";
import type { UUID } from "@/server/utils";
import type { User } from "../../domain/entities/User";
import type { TwoFactorAuthenticationSessionRepository } from "../../domain/repositories/TwoFactorAuthenticationSessionRepository";
import { DBTwoFactorAuthenticationSession } from "../entities/DBTwoFactorAuthenticationSession";
import { TwoFactorAuthenticationSessionMapper } from "../mappers/TwoFactorAuthenticationSessionMapper";
import type { TwoFactorAuthenticationSession } from "../../domain/entities/TwoFactorAuthenticationSession";

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

	async delete(session: TwoFactorAuthenticationSession) {
		const dbSession = await this.db.findOneBy({ id: session.id.value });

		if (dbSession === null) return;

		await this.db.remove(dbSession);
	}
}
