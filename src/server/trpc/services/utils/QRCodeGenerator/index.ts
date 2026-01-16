import { GetServicesContext } from "../../context";
import { getDefaultQRCodeGenerator } from "./Default";

export const getQRCodeGeneratorServices = (ctx: GetServicesContext) => {
	return {
		default: getDefaultQRCodeGenerator(ctx)
	};
}
