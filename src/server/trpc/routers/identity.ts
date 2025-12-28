import { DefaultUUIDManager } from "@/server/utils/uuid/infrastructure";
import { CreateUser } from "@/server/modules/identity/application/use-cases/CreateUser";
import { DBUser } from "@/server/modules/identity/infrastructure/entities/DBUser";
import { DBUserRepository } from "@/server/modules/identity/infrastructure/persistence/DBUserRepository";
import { NodeStringHasher } from "@/server/modules/identity/infrastructure/services/NodeStringHasher";
import { DeleteUser } from "@/server/modules/identity/application/use-cases/DeleteUser";
import { ListUsers } from "@/server/modules/identity/application/use-cases/ListUsers";
import { Login } from "@/server/modules/identity/application/use-cases/Login";
import { DBTwoFactorAuthenticationSessionRepository } from "@/server/modules/identity/infrastructure/persistence/DBTwoFactorAuthenticationSessionRepository";
import { DBTwoFactorAuthenticationSession } from "@/server/modules/identity/infrastructure/entities/DBTwoFactorAuthenticationSession";
import { NodeAuthenticationManager } from "@/server/modules/identity/infrastructure/services/NodeAuthenticationManager";
import { NodeTwoFactorAuthenticationValueManager } from "@/server/modules/identity/infrastructure/services/NodeTwoFactorAuthenticationValueManager";
import { TwoFactorAuthentication } from "@/server/modules/identity/application/use-cases/TwoFactorAuthentication";
import { createUserDTOSchema } from "@/server/modules/identity/application/dto/CreateUserDTO";
import { deleteUserDTOSchema } from "@/server/modules/identity/application/dto/DeleteUserDTO";
import { loginDTOSchema } from "@/server/modules/identity/application/dto/LoginDTO";
import { createRouter, procedure } from "../init";
import { twoFactorAuthenticationDTOSchema } from "@/server/modules/identity/application/dto/TwoFactorAuthenticationDTO";

export const identityRouter = createRouter({
    createUser: procedure.input(createUserDTOSchema).mutation(async ({ input, ctx }) => {
        const userRepository = new DBUserRepository(ctx.db.getRepository(DBUser));
        const stringHasher = new NodeStringHasher();
        const uuidManager = new DefaultUUIDManager();
        const action = new CreateUser(userRepository, stringHasher, uuidManager);
        await action.execute(input, ctx.user ?? undefined);
    }),
    deleteUser: procedure.input(deleteUserDTOSchema).mutation(async ({ input, ctx }) => {
        const userRepository = new DBUserRepository(ctx.db.getRepository(DBUser));
        const action = new DeleteUser(userRepository);
        await action.execute(input, ctx.user ?? undefined);
    }),
    listUsers: procedure.query(async ({ ctx }) => {
        const userRepository = new DBUserRepository(ctx.db.getRepository(DBUser));
        const action = new ListUsers(userRepository);
        await action.execute();
    }),
    login: procedure.input(loginDTOSchema).mutation(async ({ input, ctx }) => {
        const userRepository = new DBUserRepository(ctx.db.getRepository(DBUser));
        const twoFactorAuthenticationSessionRepository = new DBTwoFactorAuthenticationSessionRepository(ctx.db.getRepository(DBTwoFactorAuthenticationSession));
        const stringHasher = new NodeStringHasher();
        const authenticationManager = new NodeAuthenticationManager();
        const uuidManager = new DefaultUUIDManager();
        const twoFactorAuthenticationValueManager = new NodeTwoFactorAuthenticationValueManager();
        const action = new Login(
            userRepository,
            twoFactorAuthenticationSessionRepository,
            stringHasher,
            authenticationManager,
            uuidManager,
            twoFactorAuthenticationValueManager,
        );
        await action.execute(input, ctx.user ?? undefined);
    }),
    twoFactorAuthentication: procedure.input(twoFactorAuthenticationDTOSchema).mutation(async ({ input, ctx }) => {
        const userRepository = new DBUserRepository(ctx.db.getRepository(DBUser));
        const twoFactorAuthenticationSessionRepository = new DBTwoFactorAuthenticationSessionRepository(ctx.db.getRepository(DBTwoFactorAuthenticationSession));
        const authenticationManager = new NodeAuthenticationManager();
        const action = new TwoFactorAuthentication(
            userRepository,
            twoFactorAuthenticationSessionRepository,
            authenticationManager
        );
        await action.execute(input, ctx.user ?? undefined);
    }),
});
