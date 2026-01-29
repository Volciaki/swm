import type { ErrorName } from "@/server/utils/errors";
import { UtilsError } from "@/server/utils/errors";

export abstract class FilesDomainError<T extends ErrorName> extends UtilsError<T> {}
