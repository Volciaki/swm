"use client";

import { type FC } from "react";
import { Flex, Paragraph, Separator } from "@/ui/atoms";
import { ListItem } from "@/ui/molecules";
import { useMobile } from "@/ui/hooks";

type User = {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
};

export type UserListItemProps = {
	user: User;
};

export const UserListItem: FC<UserListItemProps> = ({ user }) => {
	const { mobile } = useMobile();

	return (
		<ListItem clickable>
			<Flex direction={"row"} align={"center"} justify={"space-between"} style={{ gap: "1rem" }} fullWidth>
				<Paragraph fontSize={mobile ? 1.5 : 2}>{user.name}</Paragraph>

				<Flex direction={"row"} align={"center"} gap={10} style={{ overflow: "hidden" }}>
					{!mobile && (
						<>
							<Paragraph variant={"secondary"} fontSize={1.25}>
								{`Administrator: ${user.isAdmin ? "Tak" : "Nie"}`}
							</Paragraph>

							<div style={{ height: "1.5rem" }}>
								<Separator direction={"vertical"} />
							</div>
						</>
					)}

					<Paragraph variant={"secondary"} fontSize={1.25} ellipsisOverflow>
						{user.email}
					</Paragraph>
				</Flex>
			</Flex>
		</ListItem>
	);
};
