import { UUID } from "@/server/utils";
import { TwoFactorAuthenticationSession } from "../../domain/entities/TwoFactorAuthenticationSession";
import { DBTwoFactorAuthenticationSession } from "../entities/DBTwoFactorAuthenticationSession";

export class TwoFactorAuthenticationSessionMapper {
	static fromDB(dbObject: DBTwoFactorAuthenticationSession): TwoFactorAuthenticationSession {
		const { id, value, userId } = dbObject;
		return TwoFactorAuthenticationSession.create(
			UUID.fromString(id),
			value,
			UUID.fromString(userId),
		);
	}

	static toDB(object: TwoFactorAuthenticationSession): DBTwoFactorAuthenticationSession {
		const dbObject = new DBTwoFactorAuthenticationSession();

		dbObject.id = object.id.value;
		dbObject.userId = object.userId.value;
		dbObject.value = object.value;

		return dbObject;
	}
}
