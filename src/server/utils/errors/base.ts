import { TRPCError } from "@trpc/server";
import type { ErrorName, ErrorMetadataValue, ErrorNameToFullErrorName } from "./type";

type TRPCErrorNew = ConstructorParameters<typeof TRPCError>[0];

export type BaseErrorMetadata<T extends ErrorName = ErrorName> = {
	value: ErrorMetadataValue[T];
	name: T;
	fullName: ErrorNameToFullErrorName<T>;
};

export abstract class BaseError<T extends ErrorName> extends TRPCError {
	private readonly metadata: BaseErrorMetadata<T>;

	constructor({ error, metadata }: { error: TRPCErrorNew; metadata: Omit<BaseErrorMetadata<T>, "fullName"> }) {
		super(error);

		const fullErrorName = `${metadata.name}Error` as const;

		this.metadata = {
			value: metadata.value,
			name: metadata.name,
			fullName: fullErrorName,
		};
		this.name = fullErrorName;
	}

	public getMetadata() {
		return this.metadata;
	}
}
