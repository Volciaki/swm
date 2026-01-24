export type DatabaseDataDump = {
	exportBuffer: Buffer;
};

export interface DatabaseDataManager {
	dump(): Promise<DatabaseDataDump>;
	restore(dump: DatabaseDataDump): Promise<void>
};
