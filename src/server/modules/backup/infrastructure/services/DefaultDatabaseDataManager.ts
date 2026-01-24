import { execa } from "execa";
import { DatabaseDataManager } from "../../application/services/DatabaseDataManager";
import { environment } from "@/server/environment";
import { EnvironmentType } from "@/server/environment/type";
import { NoBackupUtilitiesError } from "../errors/NoBackupUtilitiesError";

// Those tables are included in data dumps.
// Make sure that this stays in sync with whatever `FileStorageDataManager` is dumping.
const TABLES_TO_INCLUDE = [
	"assortments",
	"cells",
	"file_references",
	"notifications",
	"reports",
	"shelves",
	"temperature_readings",
];

export const shellCommandAccessible = async (command: string): Promise<boolean> => {
	try {
		await execa(command, ["--version"]);
		return true;
	} catch {
		return false;
	}
};

export class DefaultDatabaseDataManager implements DatabaseDataManager {
	constructor() { }

	async dump() {
		const inDevelopment = environment.type === EnvironmentType.DEVELOPMENT;

		const backupUtility = inDevelopment
			? "docker"
			: "pg_dump";

		if (!shellCommandAccessible(backupUtility)) throw new NoBackupUtilitiesError(backupUtility);

		const { username, port, name } = environment.database;
		const host = inDevelopment ? "postgres" : environment.database.host;
		const dbUri = `postgresql://${username}@${host}:${port}/${name}`;

		const tablesArg = TABLES_TO_INCLUDE.flatMap((table) => ["-t", table]);

		const additionalDevelopmentArgs = [
			"compose",
			"run",
			"--rm",
			"pgdump",
			"pg_dump",
		];
		const backupArgs = [
			...(inDevelopment ? additionalDevelopmentArgs : []),
			`--dbname=${dbUri}`,
			...tablesArg,
		];

		const { stdout } = await execa(
			backupUtility,
			backupArgs,
			{
				env: { PGPASSWORD: environment.database.password },
				// Support database backups up to 1GiB.
				maxBuffer: 1024 * 1024 * 1024,
			}
		);
		const dump = stdout;

		return { sqlExportBuffer: Buffer.from(dump) };
	}
}
