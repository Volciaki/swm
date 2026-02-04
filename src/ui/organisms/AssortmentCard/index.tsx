import { type FC } from "react";
import type { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { formatDateAsHumanReadable } from "@/utils";
import { Card } from "@/ui/molecules";
import { Paragraph } from "@/ui/atoms";
import { DialogButton } from "../DialogButton";

export type AssortmentCardProps = {
	assortment: AssortmentDTO;
};

export const AssortmentCard: FC<AssortmentCardProps> = ({ assortment }) => (
	<Card
		additionalActions={
			<>
				{assortment.definition.image?.visibility.publicUrl && (
					<DialogButton buttonContent={<Paragraph>{"Zobacz zdjęcie"}</Paragraph>}>
						<img
							src={assortment.definition.image?.visibility.publicUrl}
							alt={`Zdjęcie ${assortment.definition.name}`}
							style={{ maxWidth: "90vw", aspectRatio: "1/1" }}
						/>
					</DialogButton>
				)}

				<DialogButton buttonContent={<Paragraph>{"Zobacz kod QR"}</Paragraph>}>
					<img
						src={assortment.definition.qrCode.visibility.publicUrl!}
						alt={`Kod QR ${assortment.definition.name}`}
						style={{ maxWidth: "90vw", aspectRatio: "1/1" }}
					/>
				</DialogButton>
			</>
		}
	>
		<Paragraph>{`Nazwa: ${assortment.definition.name}`}</Paragraph>

		<Paragraph>{`Komentarz: ${assortment.definition.comment}`}</Paragraph>

		<Paragraph>
			{"Wymiary:"}

			<br />

			<span>{`Szerokość: ${assortment.definition.size.widthMillimeters}mm`}</span>

			<br />

			<span>{`Wysokość: ${assortment.definition.size.heightMillimeters}mm`}</span>

			<br />

			<span>{`Głębokość: ${assortment.definition.size.lengthMillimeters}mm`}</span>
		</Paragraph>

		<Paragraph>{`Waga: ${assortment.definition.weightKg}kg`}</Paragraph>

		<Paragraph>
			{`Termin ważności: ${formatDateAsHumanReadable(new Date(assortment.storedAtTimestamp + assortment.definition.expiresAfterSeconds * 1000))}`}
		</Paragraph>

		<Paragraph>
			{"Zakres temperatury:"}

			<br />

			<span>{`Minimalna: ${assortment.definition.temperatureRange.minimalCelsius}°C`}</span>

			<br />

			<span>{`Maksymalna: ${assortment.definition.temperatureRange.maximalCelsius}°C`}</span>
		</Paragraph>

		<Paragraph>{`Niebezpieczny: ${assortment.definition.isHazardous ? "Tak" : "Nie"}`}</Paragraph>
	</Card>
);
