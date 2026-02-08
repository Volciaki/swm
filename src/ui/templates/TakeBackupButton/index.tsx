import { useState, type FC } from "react";
import { Button, Paragraph, Loading, FormError } from "@/ui/atoms";
import { apiClient } from "@/ui/providers";
import { defaultErrorHandler } from "@/ui/utils";
import type { UseStateSetter } from "@/ui/types";
import { useMobile } from "@/ui/hooks";

export type TakeBackupButtonProps = {
	setIsBackupTakePending: UseStateSetter<boolean>;
	backupActionsRunning: boolean;
};

export const TakeBackupButton: FC<TakeBackupButtonProps> = ({ setIsBackupTakePending, backupActionsRunning }) => {
	const apiUtils = apiClient.useUtils();
	const takeBackup = apiClient.backups.take.useMutation({
		onSuccess: () => {
			apiUtils.backups.invalidate();
			setIsBackupTakePending(false);
		},
		onError: (e) => {
			defaultErrorHandler(e, (errorMessage) => setTakeBackupError(errorMessage));
			setIsBackupTakePending(false);
		},
	});
	const [takeBackupError, setTakeBackupError] = useState<string | undefined>();
	const { mobile } = useMobile();

	return (
		<>
			<Button
				onClick={() => {
					takeBackup.mutate();
					setIsBackupTakePending(true);
				}}
				disabled={backupActionsRunning}
			>
				<Paragraph fontSize={mobile ? 1.25 : 1.5}>{"Stwórz kopie zapasową"}</Paragraph>
			</Button>

			{takeBackup.isPending && <Loading />}

			{takeBackupError && <FormError>{takeBackupError}</FormError>}
		</>
	);
};
