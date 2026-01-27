import { TRPCError } from "@trpc/server";
import type { ErrorName, FullErrorName, ErrorMetadataValue } from "./type";

type TRPCErrorNew = ConstructorParameters<typeof TRPCError>[0];

type BaseErrorMetadata<T extends ErrorName> = { value: ErrorMetadataValue[T]; name: T };

export abstract class BaseError<T extends ErrorName> extends TRPCError {
	private readonly metadata: {
		name: FullErrorName;
		value: ErrorMetadataValue[T];
	};

	constructor({ error, metadata }: { error: TRPCErrorNew; metadata: BaseErrorMetadata<T> }) {
		super(error);

		const fullErrorName = `${metadata.name}Error` as const;

		this.metadata = {
			value: metadata.value,
			name: fullErrorName,
		};
		this.name = fullErrorName;
	}

	public getMetadata() {
		return this.metadata;
	}
}
