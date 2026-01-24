import { Base64 } from "@/server/utils";
import { FileReferenceDTO } from "@/server/utils/files/application/dto/shared/FileReferenceDTO";

export type FileDataDump = FileReferenceDTO & {
	base64: Base64,
};

export type FileStorageDataDump = {
	assortments: {
		images: FileDataDump[],
		qrCodes: FileDataDump[],
	},
	reports: FileDataDump[],
};

export interface FileStorageDataManager {
	dump(): Promise<FileStorageDataDump>;
};
