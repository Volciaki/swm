import type { Base64 } from "@/server/utils";
import type { FileReferenceDTO } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";

export type FileDataDump = FileReferenceDTO & {
	base64: Base64;
};

export type AccessedFileDataDump = Omit<FileDataDump, "visibility" | "id" | "sizeBytes">;

// Other things required to fully rebuild FileStorage.
export type FileStorageDataDumpContext = {
	bucketAndPathToId: Record<string, string>;
};

type GenericFileStorageDataDump<T> = {
	assortments: {
		images: T[];
		qrCodes: T[];
	};
	reports: T[];
	context: FileStorageDataDumpContext;
};

export type FileStorageDataDump = GenericFileStorageDataDump<FileDataDump>;

export type AccessedFileStorageDataDump = GenericFileStorageDataDump<AccessedFileDataDump>;

export interface FileStorageDataManager {
	dump(): Promise<FileStorageDataDump>;
	restore(dump: AccessedFileStorageDataDump): Promise<void>;
}
