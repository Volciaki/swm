/// Helper utility for getting implementations of interfaces. This way we don't have to import them all everywhere.
// Yes, I'm aware of the fact that eventually regenerating them all like this on each request might get compute and memory heavy. At the moment I think however that we shouldn't optimize prematurely, and keep this until we reach potential bottlenecks. This approach seems to be by far the most elegant/readable.

import { type GetServicesContext } from "./context";
import { getHelpers } from "./helpers";
import { getRepositories } from "./repositories";
import { getUtils } from "./utils";

export const getServices = (ctx: GetServicesContext) => {
    return {
        repositories: getRepositories(ctx),
        utils: getUtils(ctx),
        helpers: getHelpers(ctx),
    };
};
