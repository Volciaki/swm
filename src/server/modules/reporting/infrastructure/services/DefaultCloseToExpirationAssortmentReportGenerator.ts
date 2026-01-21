import { GetAllAssortment } from "@/server/modules/assortment/application/use-cases/GetAllAssortment";
import { ReportType } from "../../domain/entities/Report";
import { DefaultBaseReportGenerator } from "./DefaultBaseReportGenerator";

// TODO: add a custom font with support for Polish characters
export class DefaultCloseToExpirationAssortmentReportGenerator extends DefaultBaseReportGenerator<ReportType.CLOSE_TO_EXPIRATION_ASSORTMENT> {
	constructor(private readonly getAllAssortment: GetAllAssortment) {
		super()
	}

	protected getType() { return ReportType.CLOSE_TO_EXPIRATION_ASSORTMENT as const };

	async generate() {
		const assortment = await this.getAllAssortment.execute();
		const closeToExpirationAssortment = assortment.filter((a) => a.isCloseToExpiration);
		closeToExpirationAssortment.sort((a, b) => {
			const now = new Date();

			const aExpiresAt = new Date(a.storedAtTimestamp + (a.expiresAfterSeconds * 1000));
			const aTimeLeft = aExpiresAt.getTime() - now.getTime();

			const bExpiresAt = new Date(b.storedAtTimestamp + (b.expiresAfterSeconds * 1000));
			const bTimeLeft = bExpiresAt.getTime() - now.getTime();

			return aTimeLeft - bTimeLeft;
		});

		this.utils.addDate();

		this.document.fontSize(20).text(
			"Asortyment zblizajacy sie do przedawnienia",
			this.document.x,
			this.document.y + this.constants.margin,
			{ align: "center" },
		);

		this.document.fontSize(14).text(
			"Ponizej znajdziesz liste asortymentow, ktore zblizaja sie do przedawnienia. Zostana one posortowane rosnaco wedlug pozostalego im czasu zdatnosci. Oznacza to, ze produkty najbardziej wymagajace Twojej uwagi znajdziesz na samej gorze listy.",
			this.document.x,
			this.document.y + this.constants.margin,
			{ align: "justify", lineGap: 3 }
		);

		if (closeToExpirationAssortment.length === 0) {
			this.document.fontSize(18).text(
				"Brak asortymentu zblizajacego sie do przedawnienia!",
				this.document.x,
				this.document.y + this.constants.margin,
				{ align: "center" },
			);
			return this.getReturnValue();
		}

		this.utils.addAssortments(closeToExpirationAssortment);

		return this.getReturnValue();
	}
}
