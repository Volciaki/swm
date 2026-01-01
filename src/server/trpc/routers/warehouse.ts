import { CreateShelf } from "@/server/modules/warehouse/application/use-cases/CreateShelf";
import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { createShelfDTOSchema } from "@/server/modules/warehouse/application/dto/CreateShelfDTO";
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
});
