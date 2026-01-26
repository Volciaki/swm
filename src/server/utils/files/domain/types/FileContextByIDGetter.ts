import type { UUID } from "@/server/utils/uuid";
import type { FileReference } from "../entities/FileReference";

export type FileContextByIDGetter = (id: UUID) => Promise<FileReference>;
