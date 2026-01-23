import { UUID } from "@/server/utils/uuid";
import { FileReference } from "../entities/FileReference";

export type FileContextByIDGetter = (id: UUID) => Promise<FileReference>;
