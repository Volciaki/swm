import { type FC } from "react";
import { formatDateAsHumanReadable } from "@/utils";
import { Card } from "@/ui/molecules";
import { Paragraph, Image, Flex, Button, Link } from "@/ui/atoms";
import type { AssortmentDefinitionDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDefinitionDTO";
import { DialogButton } from "../DialogButton";

type Assortment = AssortmentDefinitionDTO & {
	storedAtTimestamp?: number;
	putUpByUserId?: string;
};

export type AssortmentCardProps = {
	assortment: Assortment;
};

export const AssortmentCard: FC<AssortmentCardProps> = ({ assortment }) => (
	<Card
		additionalActions={
			<Flex direction={"row"} style={{ gap: "1rem" }}>
				{assortment.image?.visibility.publicUrl && (
					<DialogButton buttonContent={<Paragraph fontSize={1.75}>{"Zobacz zdjęcie"}</Paragraph>}>
						<Image
							src={assortment.image?.visibility.publicUrl}
							alt={`Zdjęcie ${assortment.name}`}
							style={{ maxHeight: "50vh", aspectRatio: "1/1" }}
						/>
					</DialogButton>
				)}

				<DialogButton buttonContent={<Paragraph fontSize={1.75}>{"Zobacz kod QR"}</Paragraph>}>
					<Image
						src={assortment.qrCode.visibility.publicUrl!}
						alt={`Kod QR ${assortment.name}`}
						style={{ maxHeight: "50vh", aspectRatio: "1/1" }}
					/>
				</DialogButton>

				{assortment.putUpByUserId && (
					<Link href={`/centrum-zarzadzania/uzytkownicy/${assortment.putUpByUserId}`} newTab>
						<Button>
							<Paragraph fontSize={1.75}>
								{/* TODO: add an arrow facing towards the top right corner */}
								{"Przyjęty przez"}
							</Paragraph>
						</Button>
					</Link>
				)}
			</Flex>
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
