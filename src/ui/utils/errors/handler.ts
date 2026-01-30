import type { BaseErrorMetadata } from "@/server/utils";
import { getPolishErrorMessageByMetadata } from "./polish";

export type APIError = { data?: { metadata: unknown } | null };

export const defaultErrorHandler = (error: APIError, callback: (message: string) => void): string | undefined => {
	if (!error.data?.metadata) return;

	const errorMessage = getPolishErrorMessageByMetadata(error.data?.metadata as BaseErrorMetadata);

	callback(errorMessage);

	return errorMessage;
};
