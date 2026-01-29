import type { ErrorName } from "@/server/utils";
import { BaseError } from "@/server/utils";

export abstract class SchedulerError<T extends ErrorName> extends BaseError<T> {}
