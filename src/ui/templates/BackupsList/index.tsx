import { useCallback, useState, type FC } from "react";
import { Paragraph, Separator, Loading, Flex, Button, FormError } from "@/ui/atoms";
import { List, ListItem } from "@/ui/molecules";
import { formatDateAsHumanReadable } from "@/utils";
import { apiClient } from "@/ui/providers";
import type { APIError } from "@/ui/utils";
import { defaultErrorHandler } from "@/ui/utils";
import type { UseStateSetter } from "@/ui/types";
import { ToastType, useMobile, useToast } from "@/ui/hooks";

export type BackupsListProps = {
	setIsBackupApplyPending: UseStateSetter<boolean>;
	backupActionsRunning: boolean;
};

export const BackupsList: FC<BackupsListProps> = ({ setIsBackupApplyPending, backupActionsRunning }) => {
	const applyBackupById = apiClient.backups.applyById.useMutation();
	const backups = apiClient.backups.getAll.useQuery();
	const { mobile } = useMobile();
	const { toast } = useToast();

	// A Record of IDs and error messages.
	const [applyBackupErrors, setApplyBackupErrors] = useState<Record<string, string>>();
	const [applyBackupLoadings, setApplyBackupLoadings] = useState<Record<string, boolean>>();

	const backupApplyHandler = useCallback(
		async (backup: { id: string }) => {
			setIsBackupApplyPending(true);

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
				setIsBackupApplyPending(false);
				return;
			}

			setApplyBackupErrorById(backup, "");
			setBackupLoadingById(backup, false);
			setIsBackupApplyPending(false);
			toast({ title: "Sukces!", message: "Zastosowano kopie zapasową.", type: ToastType.SUCCESS });
		},
		[applyBackupById, setApplyBackupErrors, setApplyBackupLoadings, setIsBackupApplyPending, toast]
	);

	return (
		<>
			<Paragraph style={{ textAlign: "center" }} fontSize={mobile ? 1.75 : 2}>
				{"Lista kopii zapasowych"}
			</Paragraph>

			<Separator size={2} />

			{backups.isLoading && <Loading />}

			<List>
				{backups.data &&
					backups.data
						.sort((a, b) => new Date(b.dateTimestamp).getTime() - new Date(a.dateTimestamp).getTime())
						.map((backup, index) => (
							<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} key={`backup-${index}`} fullWidth>
								<ListItem>
									<Flex align={"center"} justify={"space-between"} fullWidth>
										<Paragraph fontSize={mobile ? 1.25 : 1.75}>
											{mobile ? (
												<>
													{formatDateAsHumanReadable(new Date(backup.dateTimestamp)).split(" - ")[0]}

													<br />

													{formatDateAsHumanReadable(new Date(backup.dateTimestamp)).split(" - ")[1]}
												</>
											) : (
												<>{formatDateAsHumanReadable(new Date(backup.dateTimestamp))}</>
											)}
										</Paragraph>

										<Button onClick={async () => await backupApplyHandler(backup)} disabled={backupActionsRunning}>
											<Paragraph fontSize={mobile ? 1.25 : 1.5}>{"Przywróć"}</Paragraph>
										</Button>
									</Flex>
								</ListItem>

								{applyBackupErrors?.[backup.id] && <FormError>{applyBackupErrors?.[backup.id]}</FormError>}

								{applyBackupLoadings?.[backup.id] && <Loading />}
							</Flex>
						))}
			</List>
		</>
	);
};
