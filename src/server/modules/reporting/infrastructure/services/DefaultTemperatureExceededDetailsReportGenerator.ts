import type { GetShelfTemperatureReadings } from "@/server/modules/warehouse/application/use-cases/GetShelfTemperatureReading";
import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import type { TemperatureReadingVO } from "../../domain/vo/TemperatureReadingVO";
import type { ShelfVO } from "../../domain/vo/ShelfVO";
import { ReportType } from "../../domain/entities/Report";
import type { ReportTemperatureExceededData } from "./BaseReportGenerator/Default/utils";
import { DefaultBaseReportGenerator } from "./BaseReportGenerator/Default";

type FullShelf = ShelfVO & {
	temperatureReadings: TemperatureReadingVO[];
};

export class DefaultTemperatureExceededDetailsReportGenerator extends DefaultBaseReportGenerator<ReportType.TEMPERATURE_EXCEEDED_DETAILS> {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelves: GetAllShelves,
		private readonly getShelfTemperatureReadings: GetShelfTemperatureReadings
	) {
		super();
	}

	protected getType() {
		return ReportType.TEMPERATURE_EXCEEDED_DETAILS as const;
	}

	private async getData() {
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

		const temperaturesExceeded: ReportTemperatureExceededData[] = [];
		for (const shelf of fullShelves) {
			for (const temperatureReading of shelf.temperatureReadings) {
				if (temperatureReading.temperatureWasTooLow || temperatureReading.temperatureWasTooHigh)
					temperaturesExceeded.push({
						entity: {
							...shelf,
							assortments: [],
						},
						entityType: "shelf",
						details: temperatureReading,
					});

				for (const assortment of shelf.assortments) {
					if (
						temperatureReading.temperatureCelsius < assortment.temperatureRange.minimalCelsius ||
						temperatureReading.temperatureCelsius > assortment.temperatureRange.maximalCelsius
					)
						temperaturesExceeded.push({
							entity: assortment,
							entityType: "assortment",
							details: temperatureReading,
						});
				}
			}
		}

		return { temperaturesExceeded };
	}

	async generate() {
		const { temperaturesExceeded } = await this.getData();

		this.utils.date();
		this.utils.header("Przekroczone zakresy temperatur");

		this.document
			.fontSize(12)
			.text(
				"W tym raporcie znajduję się lista regałów jak i asortymentów, które w czasie przechowywania przekroczyły swój wyznaczony zakres temperatur.",
				this.document.x,
				this.document.y + this.constants.margin,
				{ align: "justify", lineGap: 2 }
			);

		if (temperaturesExceeded.length === 0) {
			this.document
				.fontSize(18)
				.text(
					"Nie zaobserwowano ani jednego przekroczenia temperatur.",
					this.document.x,
					this.document.y + this.constants.margin,
					{ align: "center" }
				);
			return this.getReturnValue();
		}

		this.document.y += this.constants.margin;

		await this.utils.temperaturesExceeded(temperaturesExceeded);

		return this.getReturnValue();
	}
}
