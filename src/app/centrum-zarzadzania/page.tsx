"use client";

import { type FC } from "react";
import { Button, Flex, FullHeight, Link, Paragraph } from "@/ui/atoms";
import { PageHeader } from "@/ui/molecules";
import { useMobile } from "@/ui/hooks";
import styles from "../../styles/management-center.module.scss";

type ManagementCenterCardProps = {
	text: string;
	description: string;
	href: string;
};

const ManagementCenterCard: FC<ManagementCenterCardProps> = ({ text, description, href }) => {
	const { mobile } = useMobile();

	return (
		<Link href={`/centrum-zarzadzania/${href}`} style={{ width: mobile ? "90%" : "100%", height: "100%" }}>
			<Button
				variant={"secondary"}
				style={{ width: "100%", height: mobile ? "10rem" : "100%", paddingBlock: mobile ? "1rem" : "2rem" }}
			>
				<Flex
					direction={"column"}
					align={"center"}
					justify={mobile ? "space-around" : undefined}
					style={{ height: "100%" }}
					fullWidth
				>
					<Paragraph fontSize={mobile ? 1.75 : 1.5}>{text}</Paragraph>
					<Paragraph variant={"secondary"} fontSize={mobile ? 1.25 : 1}>
						{description}
					</Paragraph>
				</Flex>
			</Button>
		</Link>
	);
};

const ManagementCenter: FC = () => (
	<FullHeight style={{ width: "100%" }}>
		<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }} fullWidth>
			<PageHeader title={"Centrum Zarządzania"} description={"Stąd znawigujesz do większości funkcji magazynu."} />

			<div className={styles["container"]}>
				<ManagementCenterCard
					text={"Wizualizacja"}
					description={"przeglądaj i modyfikuj stan magazynu"}
					href={"wizualizacja"}
				/>

				<ManagementCenterCard
					text={"Zarządzanie użytkownikami"}
					description={"dodaj, usuwaj oraz przeglądaj użytkowników"}
					href={"uzytkownicy"}
				/>

				<ManagementCenterCard
					text={"Kopie zapasowe"}
					description={"twórz, przeglądaj i przywracaj kopie zapasowe"}
					href={"kopie-zapasowe"}
				/>

				<ManagementCenterCard text={"Raporty"} description={"generuj raporty i przeglądaj raporty"} href={"raporty"} />
			</div>
		</Flex>
	</FullHeight>
);

export default ManagementCenter;
