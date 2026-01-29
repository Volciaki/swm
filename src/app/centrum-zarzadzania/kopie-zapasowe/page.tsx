"use client";

import type { ReactNode, FC } from "react";
import { useState } from "react";
import { Button, Flex, FormError, FullHeight, Loading, Paragraph, Separator } from "@/ui/atoms";
import { PageHeader } from "@/ui/molecules";
import commonStyles from "@/styles/common.module.scss";
import styles from "@/styles/backup.module.scss";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";

const BackupsForm: FC<{ children: ReactNode }> = ({ children }) => (
	<Flex
		direction={"column"}
		align={"center"}
		style={{ gap: "1rem", height: "fit-content" }}
		className={commonStyles["form-container"]}
		fullWidth
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
	const [takeBackupError, setTakeBackupError] = useState<string | undefined>();

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} className={styles["container"]}>
				<PageHeader
					title={"Kopie zapasowe"}
					description={
						"Twórz, przywracaj oraz konfiguruj harmongram kopii zapasowych. Każda kopia zapasowa zawiera w sobie aktualny stan magazynu."
					}
				/>

				<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
					<BackupsForm>
						<Paragraph style={{ textAlign: "center" }}>{"Wykonaj ręcznie"}</Paragraph>

						<Button onClick={() => takeBackup.mutate()} disabled={takeBackup.isPending}>
							<Paragraph fontSize={1.5}>{"Stwórz kopie zapasową"}</Paragraph>
						</Button>

						{takeBackup.isPending && <Loading />}

						{takeBackupError && <FormError>{takeBackupError}</FormError>}
					</BackupsForm>

					<BackupsForm>
						<Paragraph style={{ textAlign: "center" }}>{"Lista kopii zapasowych"}</Paragraph>

						<Separator size={2} />
					</BackupsForm>

					<BackupsForm>
						<Paragraph style={{ textAlign: "center" }}>{"Skonfiguruj harmongram"}</Paragraph>

						<Button>
							<Paragraph fontSize={1.5}>{"Konfiguruj"}</Paragraph>
						</Button>
					</BackupsForm>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Backups;
