import { Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { Email } from "../../domain/entities/Email";
import { DBUser } from "../entities/DBUser";
import { UserMapper } from "../mappers/UserMapper";

export class DBUserRepository implements UserRepository {
	constructor(private readonly db: Repository<DBUser>) {}
    
	async create(user: User) {
		const dbUser = UserMapper.fromUserToDBUser(user);
		await this.db.save(dbUser);
	}

	async update(user: User) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(user);
	}

	async delete(user: User) {
		const dbUser = await this.db.findOneBy({ id: user.id.value });

		if (dbUser === null) return;

		await this.db.remove(dbUser);
	}

	async getAll() {
		const dbUsers = await this.db.find();
		const users = dbUsers.map((user) => UserMapper.fromDBUserToUser(user));
		return users;
	}

	async getById(id: UUID) {
		const dbUser = await this.db.findOneBy({ id: id.value });

		if (dbUser === null) return null;

		return UserMapper.fromDBUserToUser(dbUser);
	}

	async getByEmail(email: Email) {
		const dbUser = await this.db.findOneBy({ email: email.value });

		if (dbUser === null) return null;

		return UserMapper.fromDBUserToUser(dbUser);
	}
}
