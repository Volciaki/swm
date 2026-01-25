import { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { UUID } from "@/server/utils";

export class Backup {
	private constructor(
        private readonly _id: UUID,
		private readonly _date: Date,
		private readonly _file: FileReference,
	) {}

	get id() { return this._id };
	get date() { return this._date };
	get file() { return this._file };

	static create(
		id: UUID,
		date: Date,
		file: FileReference,
	) {
		return new Backup(
			id,
			date,
			file,
		);
	}

	static createNew(id: UUID, file: FileReference) {
		const now = new Date();

		return this.create(
			id,
			now,
			file,
		);
	}
}
