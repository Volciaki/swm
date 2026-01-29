import type { ErrorName } from "@/server/utils/errors";
import { UtilsError } from "@/server/utils/errors";

export abstract class FilesApplicationError<T extends ErrorName> extends UtilsError<T> {}
