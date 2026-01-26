import { type FC } from "react";
import { Button, Flex, Link, Paragraph } from "@/ui/atoms";
import { PageHeader } from "@/ui/molecules";
import styles from "../../styles/management-center.module.scss";

type ManagementCenterCardProps = {
	text: string;
	description: string;
	href: string;
};

const ManagementCenterCard: FC<ManagementCenterCardProps> = ({ text, description, href }) => (
	<Link href={`/centrum-zarzadzania/${href}`} style={{ width: "100%", height: "100%" }}>
		<Button variant={"secondary"} style={{ width: "100%", height: "100%", paddingBlock: "2rem" }}>
			<Paragraph fontSize={1.5}>{text}</Paragraph>
			<Paragraph variant={"secondary"} fontSize={1}>{description}</Paragraph>
		</Button>
	</Link>
);

const ManagementCenter: FC = () => (
	<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
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

			<ManagementCenterCard
				text={"raporty"}
				description={"generuj raporty i przeglądaj raporty"}
				href={"raporty"}
			/>
		</div>
	</Flex>
);

export default ManagementCenter;
