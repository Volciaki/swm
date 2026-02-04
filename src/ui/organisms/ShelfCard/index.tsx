import { type FC } from "react";
import type { FullShelfDTO } from "@/server/modules/storage/application/dto/shared/FullShelfDTOSchema";
import { Paragraph } from "@/ui/atoms";
import { Card } from "@/ui/molecules";

export type ShelfCardProps = {
	shelf: FullShelfDTO;
};

export const ShelfCard: FC<ShelfCardProps> = ({ shelf }) => (
	<Card>
		<Paragraph>{`Nazwa: ${shelf.name}`}</Paragraph>

		<Paragraph>{`Komentarz: ${shelf.comment}`}</Paragraph>

		<Paragraph>
			{"Maksymalne wymiary asortymentu:"}

			<br />

			<span>{`Szerokość: ${shelf.maxAssortmentSize.widthMillimeters}mm`}</span>

			<br />

			<span>{`Wysokość: ${shelf.maxAssortmentSize.heightMillimeters}mm`}</span>

			<br />

			<span>{`Głębokość: ${shelf.maxAssortmentSize.lengthMillimeters}mm`}</span>
		</Paragraph>

		<Paragraph>{`Maksymalna waga: ${shelf.maxWeightKg}kg`}</Paragraph>

		<Paragraph>
			{"Zakres temperatury:"}

			<br />

			<span>{`Minimalna: ${shelf.temperatureRange.minimalCelsius}°C`}</span>

			<br />

			<span>{`Maksymalna: ${shelf.temperatureRange.maximalCelsius}°C`}</span>
		</Paragraph>

		<Paragraph>{`Wspiera niebezpieczne: ${shelf.supportsHazardous ? "Tak" : "Nie"}`}</Paragraph>
	</Card>
);
