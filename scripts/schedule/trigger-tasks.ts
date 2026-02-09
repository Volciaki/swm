import cron from "node-cron";

type CRONExpression = string;

type Task = {
	name: string;
	triggerFrequency: CRONExpression;
};

const everyMinute = "* * * * *";
const every15Minutes = "*/15 * * * *";
const everyHour = "0 * * * *";

const tasks: Task[] = [
	{
		name: "ExpirationMonitoringTask",
		triggerFrequency: every15Minutes,
	},
	{
		name: "UpcomingExpiryMonitoringTask",
		triggerFrequency: every15Minutes,
	},
	{
		name: "ShelvesModifiedIllegallyMonitoringTask",
		triggerFrequency: everyMinute,
	},
	{
		name: "UpdateShelfTemperaturesTask",
		triggerFrequency: everyHour,
	},
	{
		name: "RoutinaryBackupCheckTask",
		triggerFrequency: everyMinute,
	},
	{
		name: "UpdateShelfWeightsTask",
		triggerFrequency: everyHour,
	},
];

const AUTHENTICATION_PASSPHRASE =
	process.env.SCHEDULE_AUTHENTICATION_PASSPHRASE || "development-schedule-authentication-passphrase";

const API_URL = process.env.API_URL || "http://localhost:3000";
const API_BASE_URL = `${API_URL}/api/trpc`;
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
