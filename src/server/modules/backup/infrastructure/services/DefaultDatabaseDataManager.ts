import { execa } from "execa";
import { environment } from "@/server/environment";
import { EnvironmentType } from "@/server/environment/type";
import { DatabaseDataDump, DatabaseDataManager } from "../../application/services/DatabaseDataManager";
import { NoBackupUtilitiesError } from "../errors/NoBackupUtilitiesError";
import { Base64, Base64Mapper } from "@/server/utils";

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
	private inDevelopment: boolean;
	private backupUtility: string[];
	private restoreUtility: string[];

	constructor() {
		this.inDevelopment = environment.type === EnvironmentType.DEVELOPMENT;
		this.backupUtility = ["pg_dump"];
		this.restoreUtility = ["pg_restore"];

		if (!shellCommandAccessible(this.backupUtility[0])) throw new NoBackupUtilitiesError(this.backupUtility[0]);
		if (!shellCommandAccessible(this.restoreUtility[0])) throw new NoBackupUtilitiesError(this.restoreUtility[0]);

		const additionalDevelopmentArgs = [
			"docker",
			"compose",
			"run",
			"--rm",
			"-i",
			"pgutils",
		];

		if (this.inDevelopment) this.backupUtility = [...additionalDevelopmentArgs, ...this.backupUtility];
		if (this.inDevelopment) this.restoreUtility = [...additionalDevelopmentArgs, ...this.restoreUtility];

		const { username, port, name } = environment.database;
		const host = this.inDevelopment ? "postgres" : environment.database.host;
		const dbUri = `postgresql://${username}@${host}:${port}/${name}`;

		this.backupUtility = [...this.backupUtility, `--dbname=${dbUri}`];
		this.restoreUtility = [...this.restoreUtility, `--dbname=${dbUri}`];
	}

	async dump() {
		const tablesArg = TABLES_TO_INCLUDE.flatMap((table) => ["-t", table]);

		const backupArgs = [
			...this.backupUtility.slice(1),
			"--clean",
			"-Fc",
			...tablesArg,
		];

		const { stdout: backupBase64String } = await execa(
			this.backupUtility[0],
			backupArgs,
			{
				env: { PGPASSWORD: environment.database.password },
				// Support database backups up to 1GiB.
				maxBuffer: 1024 * 1024 * 1024,
				encoding: "base64",
			}
		);
		const backupBase64 = Base64.fromString(backupBase64String);

		return { exportBuffer: Base64Mapper.toBuffer(backupBase64) };
	}

	async restore(dump: DatabaseDataDump) {
		const restoreArgs = [
			...this.restoreUtility.slice(1),
			"--clean",
		];

		await execa(
			this.restoreUtility[0],
			restoreArgs,
			{
				input: dump.exportBuffer,
				env: { PGPASSWORD: environment.database.password },
			}
		);
	}
}
