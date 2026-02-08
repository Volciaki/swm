"use client";

import { useCallback, useState, type FC } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, FullHeight, Image, Paragraph, Link } from "@/ui/atoms";
import { useAuthData } from "@/ui/providers";
import { Block, Dialog } from "@/ui/molecules";
import styles from "@/styles/home.module.scss";
import { useMobile } from "@/ui/hooks";

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
	const { mobile } = useMobile();
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
					<Paragraph fontSize={mobile ? 1.75 : 2}>{title}</Paragraph>

					<Paragraph variant={"secondary"} fontSize={mobile ? 1.25 : 1.5}>
						{description}
					</Paragraph>
				</div>
			</Block>
		</div>
	);
};

const Home: FC = () => {
	const { authData, isLoadingAuthData } = useAuthData();
	const { mobile } = useMobile();

	const margin = mobile ? "1rem" : "2rem";

	return (
		<FullHeight>
			<Flex direction={"column"} style={{ marginTop: mobile ? undefined : margin, gap: margin }} fullWidth>
				<Flex direction={mobile ? "column" : "row"} style={{ gap: margin }}>
					<Flex direction={"column"} align={"center"} style={{ gap: margin }}>
						<Paragraph fontSize={mobile ? 2 : 2.5} style={{ textAlign: mobile ? "center" : undefined }}>
							{"Simple Warehouse Management"}
						</Paragraph>

						<Paragraph fontSize={mobile ? 1.25 : 1.5} variant={"secondary"} style={{ textAlign: "center" }}>
							{
								"SWM to system, pozwalający zarządzać twoim magazynem w czasie rzeczywistym między wieloma urządzeniami."
							}
						</Paragraph>

						<Link href={isLoadingAuthData ? "#" : authData === null ? "/login" : "/centrum-zarzadzania"}>
							<Button variant={"secondary"} style={{ width: mobile ? undefined : "100%", padding: "12.5px" }}>
								<Paragraph
									fontSize={mobile ? 1.5 : 1.75}
									style={{
										lineHeight: mobile ? "1.5rem" : "1.75rem",
										minHeight: mobile ? "1.5rem" : "1.75rem",
										marginInline: mobile ? "20px" : undefined,
									}}
								>
									{isLoadingAuthData ? "" : authData === null ? "Zaloguj się teraz" : "Przejdź do magazynu"}
								</Paragraph>
							</Button>
						</Link>
					</Flex>

					<Image src={"/hero/showcase.png"} alt={"Ozdoba"} style={{ maxWidth: mobile ? "100%" : "65%" }} />
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
