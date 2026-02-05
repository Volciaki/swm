import { type FC } from "react";
import { formatDateAsHumanReadable } from "@/utils";
import { Card } from "@/ui/molecules";
import { Paragraph } from "@/ui/atoms";
import type { AssortmentDefinitionDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDefinitionDTO";
import { DialogButton } from "../DialogButton";

type Assortment = AssortmentDefinitionDTO & {
	storedAtTimestamp?: number;
};

export type AssortmentCardProps = {
	assortment: Assortment;
};

export const AssortmentCard: FC<AssortmentCardProps> = ({ assortment }) => (
	<Card
		additionalActions={
			<>
				{assortment.image?.visibility.publicUrl && (
					<DialogButton buttonContent={<Paragraph>{"Zobacz zdjęcie"}</Paragraph>}>
						<img
							src={assortment.image?.visibility.publicUrl}
							alt={`Zdjęcie ${assortment.name}`}
							style={{ maxWidth: "90vw", aspectRatio: "1/1" }}
						/>
					</DialogButton>
				)}

				<DialogButton buttonContent={<Paragraph>{"Zobacz kod QR"}</Paragraph>}>
					<img
						src={assortment.qrCode.visibility.publicUrl!}
						alt={`Kod QR ${assortment.name}`}
						style={{ maxWidth: "90vw", aspectRatio: "1/1" }}
					/>
				</DialogButton>
			</>
		}
	>
		<Paragraph>{`Nazwa: ${assortment.name}`}</Paragraph>

		<Paragraph>{`Komentarz: ${assortment.comment}`}</Paragraph>

		<Paragraph>
			{"Wymiary:"}

			<br />

			<span>{`Szerokość: ${assortment.size.widthMillimeters}mm`}</span>

			<br />

			<span>{`Wysokość: ${assortment.size.heightMillimeters}mm`}</span>

			<br />

			<span>{`Głębokość: ${assortment.size.lengthMillimeters}mm`}</span>
		</Paragraph>

		<Paragraph>{`Waga: ${assortment.weightKg}kg`}</Paragraph>

		{assortment.storedAtTimestamp && (
			<>
				<Paragraph>{`Data przyjęcia: ${formatDateAsHumanReadable(new Date(assortment.storedAtTimestamp))}`}</Paragraph>

				<Paragraph>
					{`Termin ważności: ${formatDateAsHumanReadable(new Date(assortment.storedAtTimestamp + assortment.expiresAfterSeconds * 1000))}`}
				</Paragraph>
			</>
		)}

		<Paragraph>
			{"Zakres temperatury:"}

			<br />

			<span>{`Minimalna: ${assortment.temperatureRange.minimalCelsius}°C`}</span>

			<br />

			<span>{`Maksymalna: ${assortment.temperatureRange.maximalCelsius}°C`}</span>
		</Paragraph>

		<Paragraph>{`Niebezpieczny: ${assortment.isHazardous ? "Tak" : "Nie"}`}</Paragraph>
	</Card>
);
