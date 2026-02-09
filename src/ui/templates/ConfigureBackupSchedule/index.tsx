"use client";

import { useCallback, useState, type FC } from "react";
import { Paragraph, Flex, Loading, RadioGroupItem, Button, FormError } from "@/ui/atoms";
import { RadioGroup } from "@/ui/molecules";
import { DialogButton } from "@/ui/organisms";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";
import { useMobile } from "@/ui/hooks";
import styles from "./index.module.scss";

const backupScheduleConfigurationPresets: Array<{ text: string; value: string; frequencySeconds: number }> = [
	{
		text: "co godzine",
		value: "every-hour",
		frequencySeconds: 60 * 60,
	},
	{
		text: "co 12 godzin",
		value: "every-12-hours",
		frequencySeconds: 12 * 60 * 60,
	},
	{
		text: "codziennie",
		value: "every-day",
		frequencySeconds: 24 * 60 * 60,
	},
	{
		text: "co tydzień",
		value: "every-week",
		frequencySeconds: 7 * 24 * 60 * 60,
	},
	{
		text: "co miesiąc",
		value: "every-month",
		frequencySeconds: 4 * 7 * 24 * 60 * 60,
	},
];

type BackupScheduleConfigurationPreset = (typeof backupScheduleConfigurationPresets)[number];

const findPresetByAmountOfSeconds = (seconds?: number): BackupScheduleConfigurationPreset | undefined | null => {
	if (seconds === undefined) return undefined;

	const preset = backupScheduleConfigurationPresets.find((one) => one.frequencySeconds === seconds);

	if (!preset) return null;

	return preset;
};

export const ConfigureBackupSchedule: FC = () => {
	const getBackupSettings = apiClient.backups.getSettings.useQuery();
	const setBackupSettings = apiClient.backups.setSettings.useMutation({
		onError: (e) => {
			defaultErrorHandler(e, (errorMessage) => setModifyBackupSettingsError(errorMessage));
			setModifyBackupSettingsSuccess(false);
		},
		onSuccess: () => {
			setModifyBackupSettingsSuccess(true);
		},
	});

	const [userScheduleConfigurationPreset, setUserScheduleConfigurationPreset] = useState<
		BackupScheduleConfigurationPreset | undefined
	>();
	const [modifyBackupSettingsError, setModifyBackupSettingsError] = useState<string | undefined>();
	const [modifyBakcupSettingsSuccess, setModifyBackupSettingsSuccess] = useState(false);

	const scheduleConfigurationPreset =
		userScheduleConfigurationPreset ?? findPresetByAmountOfSeconds(getBackupSettings.data?.takeBackupsEverySeconds);

	const { mobile } = useMobile();

	const backupSettingsUpdateHandler = useCallback(() => {
		const currentPreset = scheduleConfigurationPreset;

		if (!currentPreset) return;

		setBackupSettings.mutate({ takeBackupsEverySeconds: currentPreset.frequencySeconds });
	}, [scheduleConfigurationPreset, setBackupSettings]);

	return (
		<DialogButton buttonContent={<Paragraph fontSize={mobile ? 1.25 : 1.5}>{"Konfiguruj"}</Paragraph>}>
			<Flex direction={"column"} align={"center"} className={styles["schedule-configuration-container"]}>
				<Paragraph style={{ textAlign: "center" }} fontSize={mobile ? 1.25 : 1.75}>
					{"Konfiguracja harmonogramu tworzenia kopii zapasowych"}
				</Paragraph>

				{scheduleConfigurationPreset === undefined ? (
					<Loading />
				) : (
					<RadioGroup
						formName={"schedule-configuration-radio"}
						defaultValue={scheduleConfigurationPreset === null ? undefined : scheduleConfigurationPreset.value}
						onChange={(value) => {
							const preset = backupScheduleConfigurationPresets.find((one) => one.value === value);

							if (!preset) return;

							setUserScheduleConfigurationPreset(preset);
						}}
					>
						{backupScheduleConfigurationPresets.map((preset, index) => (
							<RadioGroupItem value={preset.value} key={`schedule-configuration-radio-item-${index}`}>
								<Paragraph variant={"secondary"} fontSize={mobile ? 1.25 : 1.5} style={{ textWrap: "nowrap" }}>
									{preset.text}
								</Paragraph>
							</RadioGroupItem>
						))}
					</RadioGroup>
				)}

				<Button onClick={() => backupSettingsUpdateHandler()}>
					<Paragraph style={{ marginInline: "20px" }} fontSize={mobile ? 1.25 : 1.5}>
						{"Potwierdź"}
					</Paragraph>
				</Button>

				{modifyBakcupSettingsSuccess && !setBackupSettings.isPending && (
					<Paragraph fontSize={mobile ? 1.25 : 1.5}>{"Sukces!"}</Paragraph>
				)}

				{modifyBackupSettingsError && <FormError>{modifyBackupSettingsError}</FormError>}

				{setBackupSettings.isPending && <Loading />}
			</Flex>
		</DialogButton>
	);
};
