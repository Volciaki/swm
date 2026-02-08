"use client";

import { type ReactNode, type FC, useState } from "react";
import { BackupsList, ConfigureBackupSchedule, TakeBackupButton } from "@/ui/templates";
import { BackButton, PageHeader } from "@/ui/molecules";
import { Flex, FullHeight, Paragraph } from "@/ui/atoms";
import type { CustomStyles } from "@/ui/types";
import commonStyles from "@/styles/common.module.scss";
import styles from "@/styles/backup.module.scss";
import { useMobile } from "@/ui/hooks";

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
	const [isBackupTakePending, setIsBackupTakePending] = useState(false);
	const [isBackupApplyPending, setIsBackupApplyPending] = useState(false);
	const { mobile, mobileDefault } = useMobile();

	const backupActionsRunning = isBackupTakePending || isBackupApplyPending;

	if (mobileDefault) return null;

	return (
		<FullHeight>
			<BackButton fallback={"/centrum-zarzadzania"} />

			<Flex direction={"column"} align={"center"} className={styles["container"]}>
				<PageHeader
					title={"Kopie zapasowe"}
					description={
						"Twórz, przywracaj oraz konfiguruj harmonogram kopii zapasowych. Każda kopia zapasowa zawiera w sobie aktualny stan magazynu."
					}
				/>

				<Flex
					direction={mobile ? "column" : "row"}
					align={mobile ? "center" : undefined}
					style={{ gap: "1rem" }}
					fullWidth
				>
					<BackupsForm style={{ width: mobile ? "100%" : "25%" }}>
						<Paragraph style={{ textAlign: "center" }} fontSize={mobile ? 1.75 : 2}>
							{"Wykonaj ręcznie"}
						</Paragraph>

						<TakeBackupButton
							setIsBackupTakePending={setIsBackupTakePending}
							backupActionsRunning={backupActionsRunning}
						/>
					</BackupsForm>

					{mobile && (
						<BackupsForm style={{ width: mobile ? "100%" : "25%" }}>
							<Paragraph style={{ textAlign: "center" }} fontSize={mobile ? 1.75 : 2}>
								{"Skonfiguruj harmongram"}
							</Paragraph>

							<ConfigureBackupSchedule />
						</BackupsForm>
					)}

					<BackupsForm style={{ width: mobile ? "100%" : "50%" }}>
						<BackupsList
							setIsBackupApplyPending={setIsBackupApplyPending}
							backupActionsRunning={backupActionsRunning}
						/>
					</BackupsForm>

					{!mobile && (
						<BackupsForm style={{ width: mobile ? "100%" : "25%" }}>
							<Paragraph style={{ textAlign: "center" }}>{"Skonfiguruj harmongram"}</Paragraph>

							<ConfigureBackupSchedule />
						</BackupsForm>
					)}
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Backups;
