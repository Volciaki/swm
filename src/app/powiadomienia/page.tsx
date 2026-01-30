"use client";

import { type FC } from "react";
import { Button, Flex, FullHeight, Paragraph, Link, Separator, Loading } from "@/ui/atoms";
import { PageHeader, List } from "@/ui/molecules";
import { apiClient } from "@/ui/providers";
import { NotificationCard } from "@/ui/organisms";

const Notifications: FC = () => {
	const termin = new Date().toLocaleString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	// NotificationCard - przyjmuje na razie 3 argumenty: tytuł, opis oraz footer w którym będzie konkretna data produktu
	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
				<PageHeader
					title={"Powiadomienia"}
					description={"Tutaj się pojawiają powiadomienia na temat bieżącego asortymentu."}
				/>

				<Flex direction={"column"} align={"center"} style={{ width: "80%", gap: "1rem" }}>
					<Separator />
					<List>
						<Link href={"powiadomienia/0"} key={"notif-0"} style={{ textDecoration: "none" }}>
							<NotificationCard
								termin={termin}
								package_id="a3a952f9-3ae2-4fdc-b222-8897dd19d22d"
								stored_in={"twój dom"}
							/>
						</Link>
						<Link href={"powiadomienia/1"} key={"notif-1"} style={{ textDecoration: "none" }}>
							<NotificationCard
								termin={termin}
								package_id="84511893-9100-49c7-90c4-40567669dcdf"
								stored_in={"forum gdańsk"}
							/>
						</Link>
						<Link href={"powiadomienia/2"} key={"notif-2"} style={{ textDecoration: "none" }}>
							<NotificationCard
								termin={termin}
								package_id="43c9d335-8ea8-4f29-84b9-fea42c543dd5"
								stored_in={"imprezownia"}
							/>
						</Link>
					</List>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Notifications;
