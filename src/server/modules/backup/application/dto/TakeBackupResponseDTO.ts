import type { z } from "zod";
import { backupDTOSchema } from "./shared/BackupDTO";

export const takeBackupResponseDTOSchema = backupDTOSchema;

export type TakeBackupResponseDTO = z.infer<typeof takeBackupResponseDTOSchema>;
