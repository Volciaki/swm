import { SchedulerTask } from "@/server/scheduler/task";
import { TimeFrame } from "@/server/utils";
import { TakeBackup } from "../../application/use-cases/TakeBackup";
import { GetBackupSettings } from "../../application/use-cases/GetBackupSettings";
import { GetAllBackups } from "../../application/use-cases/GetAllBackups";

// Checks if, according to currently defined schedule, we should take a new periodical backup, and if so takes it.
export class RoutinaryBackupCheckTask implements SchedulerTask {
	constructor(
		private readonly getAllBackups: GetAllBackups,
		private readonly getBackupSettings: GetBackupSettings,
		private readonly takeBackup: TakeBackup,
	) { }

	getName() { return "RoutinaryBackupCheckTask" };

	private async backup() {
		await this.takeBackup.execute({ skipAuthentication: true })
	}

	async execute() {
		const backups = await this.getAllBackups.execute({ skipAuthentication: true });
		// By newest to oldest.
		const sortedBackups = [...backups].sort(
			(a, b) =>
				new Date(b.dateTimestamp).getTime() - new Date(a.dateTimestamp).getTime()
		);
		const newest = sortedBackups[0];
		
		if (!newest) {
			await this.backup();
			return;
		}

		const newestBackupDate = new Date(newest.dateTimestamp);
		const now = new Date();

		const difference = TimeFrame.fromMilliseconds(now.getTime() - newestBackupDate.getTime());

		const backupSettings = await this.getBackupSettings.execute({ skipAuthentication: true });

		if (difference.seconds.value > backupSettings.takeBackupsEverySeconds) await this.backup();
	}
}
