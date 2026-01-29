import type { ErrorName } from "@/server/utils";
import { BaseError } from "@/server/utils";

export abstract class BackupApplicationError<T extends ErrorName> extends BaseError<T> {}
