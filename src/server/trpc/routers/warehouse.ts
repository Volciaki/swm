import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import { DeleteShelf } from "@/server/modules/warehouse/application/use-cases/DeleteShelf";
import { UpdateShelf } from "@/server/modules/warehouse/application/use-cases/UpdateShelf";
import { createShelfDTOSchema } from "@/server/modules/warehouse/application/dto/CreateShelfDTO";
import { deleteShelfDTOSchema } from "@/server/modules/warehouse/application/dto/DeleteShelfDTO";
import { updateShelfDTOSchema } from "@/server/modules/warehouse/application/dto/UpdateShelfDTO";
import { createRouter, procedure } from "../init";
import { getServices } from "../services";

export const warehouseRouter = createRouter({
    createShelf: procedure.input(createShelfDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const shelfRepository = services.repositories.shelf.db;
        const uuidManager = services.utils.uuidManager.default;

        const action = new CreateShelf(shelfRepository, uuidManager);
        return await action.execute(input, ctx.user ?? undefined);
    }),
    deleteShelf: procedure.input(deleteShelfDTOSchema).mutation<void>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const shelfRepository = services.repositories.shelf.db;

        const action = new DeleteShelf(shelfRepository);
        return await action.execute(input, ctx.user ?? undefined);
    }),
    updateShelf: procedure.input(updateShelfDTOSchema).mutation<ShelfDTO>(async ({ input, ctx }) => {
        const services = getServices(ctx);
        const shelfRepository = services.repositories.shelf.db;

        const action = new UpdateShelf(shelfRepository);
        return await action.execute(input, ctx.user ?? undefined);
    }),
});
