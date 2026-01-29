import type { TRPCError } from "@trpc/server";
import { initTRPC } from "@trpc/server";
import { cookies } from "next/headers";
import type { DataSource } from "typeorm";
import { NodeAuthenticationManager } from "../modules/identity/infrastructure/services/NodeAuthenticationManager";
import { DBUser } from "../modules/identity/infrastructure/entities/DBUser";
import { DBUserRepository } from "../modules/identity/infrastructure/persistence/DBUserRepository";
import { UserMapper } from "../modules/identity/infrastructure/mappers/UserMapper";
import { InvalidAuthenticationTokenError } from "../modules/identity/application/errors/InvalidAuthenticationTokenError";
import type { BaseErrorMetadata, UserDTO } from "../utils";
import { InvalidUUIDError, UUID } from "../utils";
import { appDataSource, initializeDatabase } from "../database/init";
import { environment } from "../environment";

export type APIContext = {
	db: DataSource;
	// This DTO is guaranteed to be valid if present, it provides the same guarantees as the `User` aggregate.
	// The reason it's used however is to not expose aggregates to other bounded contexts.
	user: UserDTO | null;
	cookie?: string;
};

const getUserBasedOnAuthCookie = async (cookie?: { value: string }): Promise<UserDTO | null> => {
	if (!cookie) return null;

	const authenticationManager = new NodeAuthenticationManager();
	let cookieValue;
	try {
		cookieValue = await authenticationManager.decodeAuthenticationToken(cookie.value);
	} catch (error) {
		if (error instanceof InvalidAuthenticationTokenError) return null;
		throw error;
	}

	const userRepository = new DBUserRepository(appDataSource.getRepository(DBUser));

	let userId;
	try {
		userId = UUID.fromString(cookieValue.userId);
	} catch (error) {
		if (error instanceof InvalidUUIDError) return null;
		throw error;
	}

	const userAggregate = await userRepository.getById(userId);
	if (userAggregate === null) return null;

	return UserMapper.fromUserToUserDTO(userAggregate);
};

/**
 * @see: https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (): Promise<APIContext> => {
	await initializeDatabase();

	const cookieStore = await cookies();
	const authCookie = cookieStore.get(environment.authentication.cookie.name);
	const user = await getUserBasedOnAuthCookie(authCookie);

	return { db: appDataSource, user };
};

type TRPCErrorWithMetadata = TRPCError & { getMetadata(): BaseErrorMetadata };

const t = initTRPC.context<APIContext>().create({
	errorFormatter: (options) => {
		const { shape, error } = options;

		const appError = error as TRPCErrorWithMetadata;
		const metadata = appError.getMetadata();

		return {
			...shape,
			data: {
				...shape.data,
				metadata,
			},
		};
	},
});

export const createRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const procedure = t.procedure;
