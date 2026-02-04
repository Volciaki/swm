import { type FC } from "react";
import type { AssortmentDTO } from "@/server/modules/assortment/application/dto/shared/AssortmentDTO";
import { Flex, Paragraph, Separator } from "@/ui/atoms";
import { formatDateAsHumanReadable } from "@/utils";
import { DialogButton } from "../DialogButton";
import styles from "./index.module.scss";

export type AssortmentCardProps = {
	assortment: AssortmentDTO;
};

export const AssortmentCard: FC<AssortmentCardProps> = ({ assortment }) => (
	<Flex direction={"column"} style={{ gap: "1rem" }}>
		<div className={styles["data-container"]}>
			<Flex direction={"column"} style={{ gap: "0.5rem" }} className={styles["data-wrapper"]}>
				<Paragraph fontSize={1.5}>{`Nazwa: ${assortment.definition.name}`}</Paragraph>

				<Paragraph fontSize={1.5}>{`Komentarz: ${assortment.definition.comment}`}</Paragraph>

				<Paragraph fontSize={1.5}>
					{"Wymiary:"}

					<br />

					<span>{`Szerokość: ${assortment.definition.size.widthMillimeters}mm`}</span>

					<br />

					<span>{`Wysokość: ${assortment.definition.size.heightMillimeters}mm`}</span>

					<br />

					<span>{`Głębokość: ${assortment.definition.size.lengthMillimeters}mm`}</span>
				</Paragraph>

				<Paragraph fontSize={1.5}>{`Waga: ${assortment.definition.weightKg}kg`}</Paragraph>

				<Paragraph fontSize={1.5}>
					{`Termin ważności: ${formatDateAsHumanReadable(new Date(assortment.storedAtTimestamp + assortment.definition.expiresAfterSeconds * 1000))}`}
				</Paragraph>

				<Paragraph fontSize={1.5}>
					{"Zakres temperatury:"}

					<br />

					<span style={{ marginLeft: "1rem" }}>
						{`Minimalna: ${assortment.definition.temperatureRange.minimalCelsius}°C`}
					</span>

					<br />

					<span style={{ marginLeft: "1rem" }}>
						{`Maksymalna: ${assortment.definition.temperatureRange.maximalCelsius}°C`}
					</span>
				</Paragraph>

				<Paragraph fontSize={1.5}>{`Niebezpieczny: ${assortment.definition.isHazardous ? "Tak" : "Nie"}`}</Paragraph>
			</Flex>
		</div>

		<Separator />

		<Flex direction={"row"} justify={"space-around"} align={"center"}>
			{assortment.definition.image?.visibility.publicUrl && (
				<DialogButton buttonContent={<Paragraph fontSize={1.5}>{"Zobacz zdjęcie"}</Paragraph>}>
					<img
						src={assortment.definition.image?.visibility.publicUrl}
						alt={`Zdjęcie ${assortment.definition.name}`}
						style={{ maxWidth: "90vw", aspectRatio: "1/1" }}
					/>
				</DialogButton>
			)}

			<DialogButton buttonContent={<Paragraph fontSize={1.5}>{"Zobacz kod QR"}</Paragraph>}>
				<img
					src={assortment.definition.qrCode.visibility.publicUrl!}
					alt={`Kod QR ${assortment.definition.name}`}
					style={{ maxWidth: "90vw", aspectRatio: "1/1" }}
				/>
			</DialogButton>
		</Flex>
	</Flex>
);
