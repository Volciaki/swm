import { TimeFrame, UUID } from "@/server/utils";

export class BackupSettings {
	private constructor(
        private _id: UUID,
        private _takeBackupsEvery: TimeFrame,
	) {}

	get id() { return this._id };
	get takeBackupsEvery() { return this._takeBackupsEvery };

	set takeBackupsEvery(value: TimeFrame) { this._takeBackupsEvery = value };

	static create(
		id: UUID,
		takeBackupsEvery: TimeFrame,
	) {
		return new BackupSettings(
			id,
			takeBackupsEvery,
		);
	}
}
