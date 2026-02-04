import { type FC } from "react";
import type { UserDTO } from "@/server/utils/identity/dto";
import { Paragraph } from "@/ui/atoms";
import { Card } from "@/ui/molecules";

type User = Omit<UserDTO, "passwordHash">;

export type UserCardProps = {
	user: User;
};

export const UserCard: FC<UserCardProps> = ({ user }) => (
	<Card>
		<Paragraph>{`Nazwa: ${user.name}`}</Paragraph>

		<Paragraph>{`Email: ${user.email}`}</Paragraph>

		<Paragraph>{`Administrator: ${user.isAdmin ? "Tak" : "Nie"}`}</Paragraph>

		<Paragraph>{`Weryfikacja dwuetapowa: ${user.twoFactorAuthenticationEnabled ? "Tak" : "Nie"}`}</Paragraph>
	</Card>
);
