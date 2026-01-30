"use client";

import { type FC } from "react";
import { Flex, FullHeight, Loading, Paragraph, Separator } from "@/ui/atoms";
import { PageHeader, List } from "@/ui/molecules";
import { NotificationCard } from "@/ui/organisms";
import { apiClient } from "@/ui/providers";

const Notifications: FC = () => {
	const notifications = apiClient.notifications.getAll.useQuery();

	return (
		<FullHeight>
			<Flex direction={"column"} align={"center"} style={{ gap: "1rem" }}>
				<PageHeader
					title={"Powiadomienia"}
					description={"W tej zakładce znajdziesz powiadomienia generowane automatycznie wraz z użytkowaniem magazynu."}
				/>

				<Flex direction={"column"} align={"center"} style={{ width: "75%", gap: "1rem" }}>
					<Separator />

					{notifications.isLoading && <Loading />}

					{notifications.data && notifications.data.length === 0 && <Paragraph>{"Brak powiadomień!"}</Paragraph>}

					<List>
						{notifications.data &&
							notifications.data.map((notification, index) => (
								<NotificationCard notification={notification} key={`notification-${index}`} />
							))}
					</List>
				</Flex>
			</Flex>
		</FullHeight>
	);
};

export default Notifications;
