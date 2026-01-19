import { isValidEnumValue, UUID } from "@/server/utils";
import { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { InvalidReportTypeValue } from "../errors/InvalidNotificationTypeValue";

export enum ReportType {
	CLOSE_TO_EXPIRATION_ASSORTMENT = "CLOSE_TO_EXPIRATION_ASSORTMENT",
	TEMPERATURE_EXCEEDED_DETAILS = "TEMPERATURE_EXCEEDED_DETAILS",
	FULL_STORAGE_SHOWCASE = "FULL_STORAGE_SHOWCASE",
};

const stringIsReportType = (value: string) => isValidEnumValue(ReportType, value);

export class Report {
	private constructor(
        private readonly _id: UUID,
        private readonly _type: ReportType,
        private readonly _generationDate: Date,
        private readonly _file: FileReference,
   	) {}

	static create(
		id: UUID,
		type: string,
		generationDate: Date,
		file: FileReference,
	) {
		if (!stringIsReportType(type)) throw new InvalidReportTypeValue(type);

		return new Report(id, type, generationDate, file);
	}

	get id() { return this._id };
	get type() { return this._type };
	get generationDate() { return this._generationDate };
	get file() { return this._file };
}
