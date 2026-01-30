import { type FC } from "react";
import { Button, Flex, Paragraph, Separator } from "@/ui/atoms";
import { ListItem } from "@/ui/molecules";

export type NotificationCardProps = {
	termin: string;
	package_id: string;
	stored_in: string;
};

export const NotificationCard: FC<NotificationCardProps> = ({ termin, package_id, stored_in }) => {
	// Jak dasz radę to zoptymalizuj odrobinkę linię 29 (<Button style={{ ... }}>)
	return (
		<ListItem clickable>
		<Flex direction={"column"} justify={"space-between"} fullWidth>
			<Paragraph>Termin Ważności: {termin}</Paragraph>

			<Flex direction={"column"} gap={10}>
				<Paragraph fontSize={1.25}>
					{`${package_id} ulokowanego na/w ${stored_in} zbliża się do końca ustalonej daty.`}
				</Paragraph>
				
				<Paragraph variant={"secondary"} fontSize={1}>
					Termin Ważności: {termin}
				</Paragraph>
			</Flex>
		</Flex>
		<Flex style={{ width: "30%", paddingLeft: "2rem", alignItems: "center", justifyContent: "center" }}>
			<Button style={{ display:"flex", alignItems: "center", justifyContent: "center", width: "100%", height: "70%", color: "white", fontSize: "3rem" }}>
				✓
			</Button>
		</Flex>
	</ListItem>
	)
};
