"use client";

import { type FC } from "react";
import type { NotificationDTO } from "@/server/modules/monitoring/application/dto/shared/NotificationDTO";
import { Flex, Paragraph } from "@/ui/atoms";
import { ListItem } from "@/ui/molecules";
import { formatDateAsHumanReadable } from "@/utils";
import { useMobile } from "@/ui/hooks";

export type NotificationCardProps = {
	notification: NotificationDTO;
};

export const NotificationCard: FC<NotificationCardProps> = ({ notification }) => {
	const { mobile } = useMobile();

	return (
		<ListItem>
			<Flex direction={"column"} justify={"space-between"} style={{ gap: "1rem" }} fullWidth>
				<Paragraph fontSize={mobile ? 1.25 : 1.75}>{notification.title}</Paragraph>

				<Paragraph fontSize={mobile ? 1 : 1.25}>{notification.message}</Paragraph>

				<Paragraph variant={"secondary"} fontSize={mobile ? 1 : 1.25}>
					{`Data i godzina zdarzenia: ${formatDateAsHumanReadable(new Date(notification.issuedDateTimestamp))}`}
				</Paragraph>
			</Flex>
		</ListItem>
	);
};
