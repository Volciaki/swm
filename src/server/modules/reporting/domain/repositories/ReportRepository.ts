import { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import { UUID } from "@/server/utils";
import { Report } from "../entities/Report";

export interface ReportRepository {
    create(report: Report): Promise<void>;
    update(report: Report): Promise<void>;
    delete(report: Report): Promise<void>;
    getById(id: UUID, fileContextGetter: FileContextByIDGetter): Promise<Report | null>;
	getAll(fileContextGetter: FileContextByIDGetter): Promise<Report[]>;
};
