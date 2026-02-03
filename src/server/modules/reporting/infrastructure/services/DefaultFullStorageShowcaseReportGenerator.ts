import type { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import type { GetAllShelves } from "@/server/modules/warehouse/application/use-cases/GetAllShelves";
import { assortmentDTOsToAssortmentVOs } from "@/server/utils";
import { ReportType } from "../../domain/entities/Report";
import type { ShelfVO } from "../../domain/vo/ShelfVO";
import { DefaultBaseReportGenerator } from "./BaseReportGenerator/Default";

export class DefaultFullStorageShowcaseReportGenerator extends DefaultBaseReportGenerator<ReportType.FULL_STORAGE_SHOWCASE> {
	constructor(
		private readonly getAllAssortment: GetAllAssortment,
		private readonly getShelves: GetAllShelves
	) {
		super();
	}

	protected getType() {
		return ReportType.FULL_STORAGE_SHOWCASE as const;
	}

	private async getData() {
		const allAssortments = await this.getAllAssortment.execute();
		const assortmentContext = assortmentDTOsToAssortmentVOs(allAssortments);
		const shelves = await this.getShelves.execute({ assortmentContext });
		const fullShelves: ShelfVO[] = [];

		for (const shelf of shelves) {
			const assortments = assortmentContext.filter((assortment) => assortment.shelfId === shelf.id);

			fullShelves.push({
				...shelf,
				assortments,
			});
		}

		return { fullShelves };
	}

	async generate() {
		const { fullShelves } = await this.getData();

		this.utils.date();
		this.utils.header("Inwentaryzacja stanu magazynu");

		this.document
			.fontSize(12)
			.text(
				"Regały i asortymenty wymienione niżej były całą zawartością magazynu w czasie generowania raportu.",
				this.document.x,
				this.document.y + this.constants.margin,
				{ align: "justify", lineGap: 2 }
			);

		this.document.y += this.constants.margin;

		await this.utils.shelves(fullShelves);

		return this.getReturnValue();
	}
}
