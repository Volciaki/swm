import { RandomShelfThermometer } from "@/server/modules/warehouse/infrastructure/services/RandomShelfThermometer";
import { GetServicesContext } from "../../context";

export const getRandomShelfThermometer = (ctx: GetServicesContext): RandomShelfThermometer => {
	return new RandomShelfThermometer();
}
