import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { ReportType } from "../../domain/entities/Report";
import { DefaultBaseReportGenerator } from "./DefaultBaseReportGenerator";

export class DefaultCloseToExpirationAssortmentReportGenerator extends DefaultBaseReportGenerator<ReportType.CLOSE_TO_EXPIRATION_ASSORTMENT> {
	constructor(private readonly getAllAssortment: GetAllAssortment) { super() }

	protected getType() { return ReportType.CLOSE_TO_EXPIRATION_ASSORTMENT as const };

	async generate() {
		const assortment = await this.getAllAssortment.execute();
		const closeToExpirationAssortment = assortment.filter((a) => a.isCloseToExpiration && !a.hasExpired);
		closeToExpirationAssortment.sort((a, b) => {
			const now = new Date();

			const aExpiresAt = new Date(a.storedAtTimestamp + (a.expiresAfterSeconds * 1000));
			const aTimeLeft = aExpiresAt.getTime() - now.getTime();

			const bExpiresAt = new Date(b.storedAtTimestamp + (b.expiresAfterSeconds * 1000));
			const bTimeLeft = bExpiresAt.getTime() - now.getTime();

			return aTimeLeft - bTimeLeft;
		});

		this.utils.date();
		this.utils.header("Asortyment zbliżający się do przedawnienia");

		this.document.fontSize(12).text(
			"Poniżej znajdziesz liste asortymentów, które zbliżaja się do przedawnienia. Zostaną one posortowane rosnąco według pozostałego im czasu zdatności. Oznacza to, że produkty najbardziej wymagające Twojej uwagi znajdziesz na samej górze listy.",
			this.document.x,
			this.document.y + this.constants.margin,
			{ align: "justify", lineGap: 2 }
		);

		if (closeToExpirationAssortment.length === 0) {
			this.document.fontSize(18).text(
				"Brak asortymentu zbliżającego się do przedawnienia!",
				this.document.x,
				this.document.y + this.constants.margin,
				{ align: "center" },
			);
			return this.getReturnValue();
		}

		this.document.y += this.constants.margin;

		await this.utils.assortments(closeToExpirationAssortment);

		return this.getReturnValue();
	}
}
