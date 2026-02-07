"use client";

import { useCallback, useState, type FC } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, FullHeight, Image, Paragraph, Link } from "@/ui/atoms";
import { useAuthData } from "@/ui/providers";
import { Block, Dialog } from "@/ui/molecules";
import styles from "@/styles/home.module.scss";

type HomeBlockProps = {
	title: string;
	description: string;
	mediaUrl: string;
	localPath: string;
};

const homeBlocks: HomeBlockProps[] = [
	{
		title: "Zarządzanie użytkownikami",
		description: "Wygodne i przejrzyste menu użytkowników.",
		mediaUrl: "/hero/demos/users.mp4",
		localPath: "/centrum-zarzadzania/uzytkownicy",
	},
	{
		title: "Wizualizacja",
		description: "Interaktywne zobrazowanie stanu magazynu oraz możliwość zarządzania nim.",
		mediaUrl: "/hero/demos/visualisation.mp4",
		localPath: "/centrum-zarzadzania/wizualizacja",
	},
	{
		title: "Raporty",
		description: "Natychmiastowe generowanie oraz pobieranie prostych w analizie raportów.",
		mediaUrl: "/hero/demos/reports.mp4",
		localPath: "/centrum-zarzadzania/raporty",
	},
	{
		title: "Kopie zapasowe",
		description: "Przyjemny w użytku harmonogram i proste aplikowanie kopii zapasowych.",
		mediaUrl: "/hero/demos/backups.mp4",
		localPath: "/centrum-zarzadzania/kopie-zapasowe",
	},
	{
		title: "Powiadomienia",
		description: "Wyraźne menu powiadomień, dzięki któremu zawsze będziesz na czasie.",
		mediaUrl: "/hero/demos/notifications.mp4",
		localPath: "/powiadomienia",
	},
];

const HomeBlock: FC<HomeBlockProps> = ({ title, description, mediaUrl, localPath }) => {
	const { authData } = useAuthData();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();

	const clickHandler = useCallback(() => {
		if (authData === null) {
			setIsDialogOpen(true);
			return;
		}

		router.push(localPath);
	}, [authData, router, localPath]);

	return (
		<div className={styles["block"]}>
			<Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
				<video style={{ maxWidth: "100%" }} src={mediaUrl} controls muted />
			</Dialog>

			<Block style={{ cursor: "pointer", height: "100%" }}>
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "space-between",
						flexDirection: "column",
					}}
					onClick={() => clickHandler()}
				>
					<Paragraph>{title}</Paragraph>

					<Paragraph variant={"secondary"} fontSize={1.5}>
						{description}
					</Paragraph>
				</div>
			</Block>
		</div>
	);
};

const Home: FC = () => {
	const { authData, isLoadingAuthData } = useAuthData();

	return (
		<FullHeight>
			<Flex direction={"column"} style={{ marginTop: "2rem", gap: "2rem" }} fullWidth>
				<Flex direction={"row"} style={{ gap: "2rem" }}>
					<Flex direction={"column"} justify={"center"} style={{ gap: "2rem" }}>
						<Paragraph fontSize={2.5}>{"Simple Warehouse Management"}</Paragraph>

						<Paragraph fontSize={1.25} variant={"secondary"}>
							{
								"SWM to system, pozwalający zarządzać twoim magazynem w czasie rzeczywistym między wieloma urządzeniami."
							}
						</Paragraph>

						<Link href={isLoadingAuthData ? "#" : authData === null ? "/login" : "/centrum-zarzadzania"}>
							<Button variant={"secondary"} style={{ width: "100%", padding: "12.5px" }}>
								<Paragraph fontSize={1.75} style={{ lineHeight: "1.75rem", minHeight: "1.75rem" }}>
									{isLoadingAuthData ? "" : authData === null ? "Zaloguj się teraz" : "Przejdź do magazynu"}
								</Paragraph>
							</Button>
						</Link>
					</Flex>

					<Image src={"/hero/showcase.png"} alt={"Ozdoba"} style={{ maxWidth: "65%" }} />
				</Flex>

				<div className={styles["blocks-container"]}>
					{homeBlocks.map((data, index) => (
						<HomeBlock {...data} key={`block-${index}`} />
					))}
				</div>
			</Flex>
		</FullHeight>
	);
};

export default Home;
