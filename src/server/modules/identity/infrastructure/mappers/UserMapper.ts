import type { UserDTO } from "@/server/utils";
import { UUID } from "@/server/utils";
import { Email } from "../../domain/entities/Email";
import { User } from "../../domain/entities/User";
import { DBUser } from "../entities/DBUser";
import type { PublicUserDTO } from "../../application/dto/shared/PublicUserDTO";

export class UserMapper {
	static fromDBUserToUser(dbUser: DBUser): User {
		const { email, passwordHash, id, name, isAdmin, twoFactorAuthenticationEnabled } = dbUser;
		return User.create(
			Email.fromString(email),
			passwordHash,
			UUID.fromString(id),
			name,
			isAdmin,
			twoFactorAuthenticationEnabled
		);
	}

	static fromUserToDBUser(user: User): DBUser {
		const dbUser = new DBUser();

		dbUser.twoFactorAuthenticationEnabled = user.twoFactorAuthenticationEnabled;
		dbUser.isAdmin = user.isAdmin;
		dbUser.passwordHash = user.passwordHash;
		dbUser.email = user.email.value;
		dbUser.id = user.id.value;
		dbUser.name = user.name;

		return dbUser;
	}

	static fromUserToUserDTO(user: User): UserDTO {
		return {
			email: user.email.value,
			id: user.id.value,
			name: user.name,
			isAdmin: user.isAdmin,
			passwordHash: user.passwordHash,
			twoFactorAuthenticationEnabled: user.twoFactorAuthenticationEnabled,
		};
	}

	static fromUserToPublicUserDTO(user: User): PublicUserDTO {
		return {
			email: user.email.value,
			id: user.id.value,
			name: user.name,
			isAdmin: user.isAdmin,
			twoFactorAuthenticationEnabled: user.twoFactorAuthenticationEnabled,
		};
	}
}
