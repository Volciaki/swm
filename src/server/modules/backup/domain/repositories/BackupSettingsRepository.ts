import type { BackupSettings } from "../entities/BackupSettings";

export interface BackupSettingsRepository {
	create(backupSettings: BackupSettings): Promise<void>;
	update(backupSettings: BackupSettings): Promise<void>;
	get(): Promise<BackupSettings | null>;
}
