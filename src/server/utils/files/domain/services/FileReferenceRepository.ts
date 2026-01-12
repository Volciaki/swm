import { UUID } from "@/server/utils/uuid";
import { FileReference } from "../entities/FileReference";

export interface FileReferenceRepository {
    create(fileReference: FileReference): Promise<FileReference>;
    update(fileReference: FileReference): Promise<FileReference>;
    delete(fileReference: FileReference): Promise<void>;
    getAll(): Promise<FileReference[]>;
    getById(id: UUID): Promise<FileReference | null>;
    getByPath(path: string): Promise<FileReference | null>;
};
