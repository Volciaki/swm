import { DBFileReferenceRepository } from "@/server/utils/files/infrastructure/persistence/DBFileReferenceRepository";
import { DBFileReference } from "@/server/utils/files/infrastructure/entities/DBFileReference";
import { GetServicesContext } from "../../context";

export const getDBFileReferenceRepository = (ctx: GetServicesContext): DBFileReferenceRepository => {
	return new DBFileReferenceRepository(ctx.db.getRepository(DBFileReference));
}
