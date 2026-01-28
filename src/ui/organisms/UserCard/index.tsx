import { type FC } from "react";
import { Flex, Paragraph, Separator } from "@/ui/atoms";
import { ListItem } from "@/ui/molecules";

type User = {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
};

export type UserCardProps = {
	user: User;
};

export const UserCard: FC<UserCardProps> = ({ user }) => (
	<ListItem clickable>
		<Flex direction={"row"} align={"center"} justify={"space-between"} fullWidth>
			<Paragraph>{user.name}</Paragraph>

			<Flex direction={"row"} align={"center"} gap={10}>
				<Paragraph variant={"secondary"} fontSize={1.25}>
					{`Administrator: ${user.isAdmin ? "Tak" : "Nie"}`}
				</Paragraph>

				<div style={{ height: "1.5rem" }}>
					<Separator direction={"vertical"} />
				</div>

				<Paragraph variant={"secondary"} fontSize={1.25}>
					{user.email}
				</Paragraph>
			</Flex>
		</Flex>
	</ListItem>
);
