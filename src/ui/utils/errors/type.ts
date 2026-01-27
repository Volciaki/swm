import type { ErrorMetadataValue, ErrorName } from "@/server/utils";

export type ErrorMessageMapper = {
	[E in ErrorName]: (metadata: ErrorMetadataValue[E]) => string;
};
