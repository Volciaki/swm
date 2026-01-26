import { FileReferenceMapper } from "@/server/utils/files/infrastructure/mappers/FileReferenceMapper";
import type { FileReference } from "@/server/utils/files/domain/entities/FileReference";
import { UUID } from "@/server/utils";
import type { ReportDTO } from "../../application/dto/shared/ReportDTO";
import { Report } from "../../domain/entities/Report";
import { DBReport } from "../entities/DBReport";

export class ReportMapper {
	static fromDTOToEntity(dto: ReportDTO): Report {
		const { id, type, generationDateTimestamp, file } = dto;
		return Report.create(
			UUID.fromString(id),
			type,
			new Date(generationDateTimestamp),
			FileReferenceMapper.fromDTOToEntity(file)
		);
	}

	static fromEntityToDTO(entity: Report): ReportDTO {
		const { id, type, file, generationDate } = entity;
		return {
			id: id.value,
			type,
			generationDateTimestamp: generationDate.getTime(),
			file: FileReferenceMapper.fromEntityToDTO(file),
		};
	}

	static fromEntityToDB(entity: Report): DBReport {
		const dbObject = new DBReport();
		const { id, type, file, generationDate } = entity;

		dbObject.id = id.value;
		dbObject.type = type;
		dbObject.generationDate = generationDate;
		dbObject.fileId = file.id.value;

		return dbObject;
	}

	static fromDBToEntity(db: DBReport, file: FileReference): Report {
		return Report.create(UUID.fromString(db.id), db.type, db.generationDate, file);
	}
}
