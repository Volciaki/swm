import { FileContextByIDGetter } from "@/server/utils/files/domain/types/FileContextByIDGetter";
import { UUID } from "@/server/utils";
import { Backup } from "../entities/Backup";

export interface BackupRepository {
    create(backup: Backup): Promise<void>;
    update(backup: Backup): Promise<void>;
    delete(backup: Backup): Promise<void>;
    getById(id: UUID, getFileContextById: FileContextByIDGetter): Promise<Backup | null>;
    getAll(getFileContextById: FileContextByIDGetter): Promise<Backup[]>;
};
