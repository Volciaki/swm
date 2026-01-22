import { GetShelfTemperatureReadings } from "@/server/modules/warehouse/application/use-cases/GetShelfTemperatureReading";
import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { TemperatureReadingVO } from "../../domain/vo/TemperatureReadingVO";
import { ShelfVO } from "../../domain/vo/ShelfVO";
import { ReportType } from "../../domain/entities/Report";
import { DefaultBaseReportGenerator } from "./DefaultBaseReportGenerator";

type FullShelf = ShelfVO & {
	temperatureReadings: TemperatureReadingVO[];
};

export class DefaultTemperatureExceededDetailsReportGenerator extends DefaultBaseReportGenerator<ReportType.TEMPERATURE_EXCEEDED_DETAILS> {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelves: GetAllShelves,
		private readonly getShelfTemperatureReadings: GetShelfTemperatureReadings,
	) { super() }

	protected getType() { return ReportType.TEMPERATURE_EXCEEDED_DETAILS as const };

	async generate() {
		const assortmentContext = await this.getAllAssortment.execute();
		const shelves = await this.getShelves.execute({ assortmentContext });
		const fullShelves: FullShelf[] = [];

		for (const shelf of shelves) {
			const temperatureReadings = await this.getShelfTemperatureReadings.execute({ id: shelf.id, assortmentContext });
			const assortments = assortmentContext.filter((assortment) => assortment.shelfId === shelf.id);

			fullShelves.push({
				...shelf,
				assortments,
				temperatureReadings,
			});
		}

		this.utils.date();
		this.utils.header("Przekroczone zakresy temperatur");

		this.document.fontSize(12).text(
			"W tym raporcie znajduję się lista regałów jak i asortymentów, które w czasie przechowywania przekroczyły swój wyznaczony zakres temperatur.",
			this.document.x,
			this.document.y + this.constants.margin,
			{ align: "justify", lineGap: 2 }
		);

		this.document.y += this.constants.margin;

		// TODO: ???
		// this.utils.shelves(fullShelves);

		return this.getReturnValue();
	}
}
