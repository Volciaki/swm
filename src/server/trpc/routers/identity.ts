import { CreateUser } from "@/server/modules/identity/application/use-cases/CreateUser";
import { DeleteUser } from "@/server/modules/identity/application/use-cases/DeleteUser";
import { ListUsers } from "@/server/modules/identity/application/use-cases/ListUsers";
import { Login } from "@/server/modules/identity/application/use-cases/Login";
import { TwoFactorAuthentication } from "@/server/modules/identity/application/use-cases/TwoFactorAuthentication";
import { createUserDTOSchema } from "@/server/modules/identity/application/dto/CreateUserDTO";
import { deleteUserDTOSchema } from "@/server/modules/identity/application/dto/DeleteUserDTO";
import { loginDTOSchema } from "@/server/modules/identity/application/dto/LoginDTO";
import { twoFactorAuthenticationDTOSchema } from "@/server/modules/identity/application/dto/TwoFactorAuthenticationDTO";
import { createRouter, procedure } from "../init";
import { getServices } from "../services";

export const identityRouter = createRouter({
    createUser: procedure.input(createUserDTOSchema).mutation(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const userRepository = services.repositories.user.db;
        const stringHasher = services.utils.stringHasher.node;
        const uuidManager = services.utils.uuidManager.node;

        const action = new CreateUser(userRepository, stringHasher, uuidManager);
        await action.execute(input, ctx.user ?? undefined);
    }),
    deleteUser: procedure.input(deleteUserDTOSchema).mutation(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const userRepository = services.repositories.user.db;

        const action = new DeleteUser(userRepository);
        await action.execute(input, ctx.user ?? undefined);
    }),
    listUsers: procedure.query(async ({ ctx }) => {
        const services = getServices(ctx);
        const userRepository = services.repositories.user.db;

        const action = new ListUsers(userRepository);
        await action.execute();
    }),
    login: procedure.input(loginDTOSchema).mutation(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const userRepository = services.repositories.user.db;
        const twoFactorAuthenticationSessionRepository = services.repositories.twoFactorAuthenticationSession.db;
        const stringHasher = services.utils.stringHasher.node;
        const authenticationManager = services.utils.authenticationManager.node;
        const uuidManager = services.utils.uuidManager.node;
        const twoFactorAuthenticationValueManager = services.utils.twoFactorAuthenticationValueManager.node;

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
        const services = getServices(ctx);
        const userRepository = services.repositories.user.db;
        const twoFactorAuthenticationSessionRepository = services.repositories.twoFactorAuthenticationSession.db;
        const authenticationManager = services.utils.authenticationManager.node;

        const action = new TwoFactorAuthentication(
            userRepository,
            twoFactorAuthenticationSessionRepository,
            authenticationManager
        );
        await action.execute(input, ctx.user ?? undefined);
    }),
});
