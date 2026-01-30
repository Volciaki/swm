"use client";

import type { ReactNode, FC } from "react";
import { useCallback, useState } from "react";
import { DialogButton } from "@/ui/organisms";
import { Button, Flex, FormError, FullHeight, Loading, Paragraph, Separator, RadioGroupItem } from "@/ui/atoms";
import { List, ListItem, PageHeader, RadioGroup } from "@/ui/molecules";
import { apiClient } from "@/ui/providers";
import type { APIError } from "@/ui/utils";
import { defaultErrorHandler } from "@/ui/utils";
import type { CustomStyles } from "@/ui/types";
import { formatDateAsHumanReadable } from "@/utils";
import commonStyles from "@/styles/common.module.scss";
import styles from "@/styles/backup.module.scss";

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

type BackupsFormProps = {
	children: ReactNode;
	style?: CustomStyles["style"];
};

const BackupsForm: FC<BackupsFormProps> = ({ children, style }) => (
	<Flex
		direction={"column"}
		align={"center"}
		style={{ gap: "1rem", height: "fit-content", ...style }}
		className={commonStyles["form-container"]}
	>
		{children}
	</Flex>
);

const Backups: FC = () => {
	const apiUtils = apiClient.useUtils();
	const takeBackup = apiClient.backups.take.useMutation({
		onSuccess: () => {
			apiUtils.backups.invalidate();
		},
		onError: (e) => defaultErrorHandler(e, (errorMessage) => setTakeBackupError(errorMessage)),
	});
	const applyBackupById = apiClient.backups.applyById.useMutation({
		// TODO: show a toast here?
		onSuccess: () => {},
	});
	const getBackupSettings = apiClient.backups.getBackupSettings.useQuery();
	const setBackupSettings = apiClient.backups.setBackupSettings.useMutation({
		onError: (e) => defaultErrorHandler(e, (errorMessage) => setModifyBackupSettingsError(errorMessage)),
	});
	const backups = apiClient.backups.getAll.useQuery();

	const [takeBackupError, setTakeBackupError] = useState<string | undefined>();
	// A Record of IDs and error messages.
	const [applyBackupErrors, setApplyBackupErrors] = useState<Record<string, string>>();
	const [applyBackupLoadings, setApplyBackupLoadings] = useState<Record<string, boolean>>();
	const [userScheduleConfigurationPreset, setUserScheduleConfigurationPreset] = useState<
		BackupScheduleConfigurationPreset | undefined
	>();
	const [modifyBackupSettingsError, setModifyBackupSettingsError] = useState<string | undefined>();

	const scheduleConfigurationPreset =
		userScheduleConfigurationPreset ?? findPresetByAmountOfSeconds(getBackupSettings.data?.takeBackupsEverySeconds);

	const backupApplyHandler = useCallback(
		async (backup: { id: string }) => {
			const setApplyBackupErrorById = (backup: { id: string }, error: string) => {
				setApplyBackupErrors((current) => {
					let record = current;
					if (!record) record = {};

					record[backup.id] = error;
					return record;
				});
			};
			const setBackupLoadingById = (backup: { id: string }, isLoading: boolean) => {
				setApplyBackupLoadings((current) => {
					let record = current;
					if (!record) record = {};

					record[backup.id] = isLoading;
					return record;
				});
			};

			try {
				setBackupLoadingById(backup, true);
				await applyBackupById.mutateAsync(backup);
			} catch (e) {
				defaultErrorHandler(e as APIError, (errorMessage) => setApplyBackupErrorById(backup, errorMessage));
				setBackupLoadingById(backup, false);
				return;
			}

			setApplyBackupErrorById(backup, "");
			setBackupLoadingById(backup, false);
		},
		[applyBackupById, setApplyBackupErrors, setApplyBackupLoadings]
	);

	const backupSettingsUpdateHandler = useCallback(() => {
		const currentPreset = scheduleConfigurationPreset;

		if (!currentPreset) return;

		setBackupSettings.mutate({ takeBackupsEverySeconds: currentPreset.frequencySeconds });
	}, [scheduleConfigurationPreset, setBackupSettings]);

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} className={styles["container"]}>
				<PageHeader
					title={"Kopie zapasowe"}
					description={
						"Twórz, przywracaj oraz konfiguruj harmonogram kopii zapasowych. Każda kopia zapasowa zawiera w sobie aktualny stan magazynu."
					}
				/>

				<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
					<BackupsForm style={{ width: "25%" }}>
						<Paragraph style={{ textAlign: "center" }}>{"Wykonaj ręcznie"}</Paragraph>

						<Button onClick={() => takeBackup.mutate()} disabled={takeBackup.isPending || applyBackupById.isPending}>
							<Paragraph fontSize={1.5}>{"Stwórz kopie zapasową"}</Paragraph>
						</Button>

						{takeBackup.isPending && <Loading />}

						{takeBackupError && <FormError>{takeBackupError}</FormError>}
					</BackupsForm>

					<BackupsForm style={{ width: "50%" }}>
						<Paragraph style={{ textAlign: "center" }}>{"Lista kopii zapasowych"}</Paragraph>

						<Separator size={2} />

						{backups.isLoading && <Loading />}

						<List>
							{backups.data &&
								backups.data
									.sort((a, b) => new Date(b.dateTimestamp).getTime() - new Date(a.dateTimestamp).getTime())
									.map((backup, index) => (
										<Flex
											direction={"column"}
											align={"center"}
											style={{ gap: "1rem" }}
											key={`backup-${index}`}
											fullWidth
										>
											<ListItem>
												<Flex align={"center"} justify={"space-between"} fullWidth>
													<Paragraph fontSize={1.75}>
														{formatDateAsHumanReadable(new Date(backup.dateTimestamp))}
													</Paragraph>

													<Button
														onClick={async () => await backupApplyHandler(backup)}
														disabled={takeBackup.isPending || applyBackupById.isPending}
													>
														<Paragraph fontSize={1.5}>{"Przywróć"}</Paragraph>
													</Button>
												</Flex>
											</ListItem>

											{applyBackupErrors?.[backup.id] && <FormError>{applyBackupErrors?.[backup.id]}</FormError>}

											{applyBackupLoadings?.[backup.id] && <Loading />}
										</Flex>
									))}
						</List>
					</BackupsForm>

					<BackupsForm style={{ width: "25%" }}>
						<Paragraph style={{ textAlign: "center" }}>{"Skonfiguruj harmongram"}</Paragraph>

						<DialogButton buttonContent={<Paragraph fontSize={1.5}>{"Konfiguruj"}</Paragraph>}>
							<Flex direction={"column"} align={"center"} className={styles["schedule-configuration-container"]}>
								<Paragraph style={{ textAlign: "center" }} fontSize={1.75}>
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
												<Paragraph variant={"secondary"} fontSize={1.5} style={{ textWrap: "nowrap" }}>
													{preset.text}
												</Paragraph>
											</RadioGroupItem>
										))}
									</RadioGroup>
								)}

								<Button onClick={() => backupSettingsUpdateHandler()}>
									<Paragraph style={{ marginInline: "20px" }} fontSize={1.5}>
										{"Podtwierdź"}
									</Paragraph>
								</Button>

								{modifyBackupSettingsError && <FormError>{modifyBackupSettingsError}</FormError>}

								{setBackupSettings.isPending && <Loading />}
							</Flex>
						</DialogButton>
					</BackupsForm>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Backups;
