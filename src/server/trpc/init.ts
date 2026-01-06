import { initTRPC } from "@trpc/server";
import { cookies } from "next/headers";
import { DataSource } from "typeorm";
import { User } from "../modules/identity/domain/entities/User";
import { NodeAuthenticationManager } from "../modules/identity/infrastructure/services/NodeAuthenticationManager";
import { DBUser } from "../modules/identity/infrastructure/entities/DBUser";
import { DBUserRepository } from "../modules/identity/infrastructure/persistence/DBUserRepository";
import { appDataSource, initializeDatabase } from "../database/init";
import { environment } from "../environment";
import { UUID } from "../utils";

export type APIContext = {
    db: DataSource;
    user: User | null;
};

/**
 * @see: https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (): Promise<APIContext> => {
    await initializeDatabase();

    const cookieStore = await cookies();
    const authCookie = cookieStore.get(environment.authentication.cookie.name);

    let user;
    if (authCookie) {
        const authenticationManager = new NodeAuthenticationManager();
        const cookieValue = await authenticationManager.decodeAuthenticationToken(authCookie.value);

        const userRepository = new DBUserRepository(appDataSource.getRepository(DBUser));
        const userId = UUID.fromString(cookieValue.userId);
        user = await userRepository.getById(userId);
    } else {
        user = null;
    }

    return { db: appDataSource, user };
};

const t = initTRPC.context<APIContext>().create();

export const createRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const procedure = t.procedure;
