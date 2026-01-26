import type { UUIDManager } from "@/server/utils";
import { TimeFrame } from "@/server/utils";
import { BackupSettings } from "../../domain/entities/BackupSettings";
import type { BackupSettingsRepository } from "../../domain/repositories/BackupSettingsRepository";

export interface BackupSettingsHelper {
	getOrCreate(): Promise<BackupSettings>;
}

export class DefaultBackupSettingsHelper implements BackupSettingsHelper {
	constructor(
		private readonly uuidManager: UUIDManager,
		private readonly backupSettingsRepository: BackupSettingsRepository
	) {}
	async getOrCreate() {
		const backupSettings = await this.backupSettingsRepository.get();

		if (backupSettings) return backupSettings;

		const newBackupSettings = BackupSettings.create(
			this.uuidManager.generate(),
			TimeFrame.fromSeconds(7 * 24 * 60 * 60)
		);
		await this.backupSettingsRepository.create(newBackupSettings);
		return newBackupSettings;
	}
}
