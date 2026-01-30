import { type FC } from "react";
import type { NotificationDTO } from "@/server/modules/monitoring/application/dto/shared/NotificationDTO";
import { Flex, Paragraph } from "@/ui/atoms";
import { ListItem } from "@/ui/molecules";
import { formatDateAsHumanReadable } from "@/utils";

export type NotificationCardProps = {
	notification: NotificationDTO;
};

export const NotificationCard: FC<NotificationCardProps> = ({ notification }) => (
	<ListItem>
		<Flex direction={"column"} justify={"space-between"} style={{ gap: "1rem" }} fullWidth>
			<Paragraph fontSize={1.75}>{notification.title}</Paragraph>

			<Paragraph fontSize={1.25}>{notification.message}</Paragraph>

			<Paragraph variant={"secondary"} fontSize={1.25}>
				{`Data i godzina zdarzenia: ${formatDateAsHumanReadable(new Date(notification.issuedDateTimestamp))}`}
			</Paragraph>
		</Flex>
	</ListItem>
);
