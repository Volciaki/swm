export type DatabaseDataDump = {
	sqlExportBuffer: Buffer;
};

export interface DatabaseDataManager {
	dump(): Promise<DatabaseDataDump>;
};
