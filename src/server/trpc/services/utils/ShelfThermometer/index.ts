import { GetServicesContext } from "../../context";
import { getRandomShelfThermometer } from "./Random";

export const getShelfThermometerServices = (ctx: GetServicesContext) => {
	return {
		random: getRandomShelfThermometer(ctx),
	};
}
