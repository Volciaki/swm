import cron from "node-cron";

type CRONExpression = string;

type Task = {
	name: string;
	triggerFrequency: CRONExpression;
};

const everyMinute = "* * * * *";

const tasks: Task[] = [
	{
		name: "ExpirationMonitoringTask",
		triggerFrequency: everyMinute,
	},
	{
		name: "UpcomingExpiryMonitoringTask",
		triggerFrequency: everyMinute,
	},
	{
		name: "ShelvesModifiedIllegallyMonitoringTask",
		triggerFrequency: everyMinute,
	},
	{
		name: "UpdateShelfTemperaturesTask",
		triggerFrequency: everyMinute,
	},
	{
		name: "RoutinaryBackupCheckTask",
		triggerFrequency: everyMinute,
	},
];

const AUTHENTICATION_PASSPHRASE =
	process.env.SCHEDULE_AUTHENTICATION_PASSPHRASE || "development-schedule-authentication-passphrase";

const PORT = process.env.PORT || "3000";
const API_BASE_URL = `http://localhost:${PORT}/api/trpc`;
const TRIGGER_ENDPOINT_PATH = "schedule.startTaskByName";

const triggerTaskByName = async (name: string) => {
	const url = `${API_BASE_URL}/${TRIGGER_ENDPOINT_PATH}`;
	const options = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: `{"name": "${name}", "authenticationPassphrase": "${AUTHENTICATION_PASSPHRASE}"}`,
	};

	await fetch(url, options);
};

for (const task of tasks) {
	cron.schedule(task.triggerFrequency, async () => triggerTaskByName(task.name));
}
