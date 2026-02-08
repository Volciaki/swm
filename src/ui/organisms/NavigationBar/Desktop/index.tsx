"use client";

import type { FC } from "react";
import { useMemo, useState } from "react";
import { type Route } from "@/utils/routes";
import { Button, Flex, Link, Paragraph } from "@/ui/atoms";
import { useAuthData } from "@/ui/providers";
import styles from "./index.module.scss";

export type DesktopNavigationBarProps = {
	onLogout: () => void;
	routes: readonly Route[];
};

export const DesktopNavigationBar: FC<DesktopNavigationBarProps> = ({ onLogout, routes }) => {
	const { authData, isLoadingAuthData } = useAuthData();
	const [areUserDetailsShown, setAreUserDetailsShown] = useState(false);
	const isAuthenticated = useMemo(() => authData !== null, [authData]);

	if (isLoadingAuthData) return null;

	return (
		<Flex align={"center"} justify={"space-between"} style={{ height: "100%" }} fullWidth>
			<Link href={"/"} style={{ textDecoration: "none" }}>
				<Paragraph className={styles["text"]} fontSize={3}>
					{"SWM"}
				</Paragraph>
			</Link>

			<ul className={styles["links-container"]}>
				{routes.map((route, index) => (
					<li className={styles["link-item"]} key={`route-${index}`}>
						<Link href={route.href}>
							<Button variant={"secondary"}>
								<Paragraph fontSize={1.5}>{route.text}</Paragraph>
							</Button>
						</Link>
					</li>
				))}

				{!isAuthenticated && (
					<Link href={"/login"}>
						<Button variant={"primary"}>
							<Paragraph fontSize={1.5}>{"Zaloguj się"}</Paragraph>
						</Button>
					</Link>
				)}

				{isAuthenticated && (
					<Button onClick={() => setAreUserDetailsShown((current) => !current)}>
						<Paragraph fontSize={1.5}>{authData?.name}</Paragraph>
					</Button>
				)}

				{areUserDetailsShown && authData && (
					<Flex direction={"column"} className={styles["user-details-container"]}>
						<Link href={`/centrum-zarzadzania/uzytkownicy/${authData.id}/edytuj`}>
							<Button style={{ width: "100%" }} onClick={() => setAreUserDetailsShown(false)}>
								<Paragraph fontSize={1.25}>{authData.name}</Paragraph>
							</Button>
						</Link>

						<Paragraph fontSize={1.25} ellipsisOverflow>{`Login: ${authData.name}`}</Paragraph>
						<Paragraph fontSize={1.25} ellipsisOverflow>{`Email: ${authData.email}`}</Paragraph>
						<Paragraph fontSize={1.25} ellipsisOverflow>
							{`Typ konta: ${authData.isAdmin ? "Administrator" : "Użytkownik"}`}
						</Paragraph>

						<Button
							onClick={() => {
								onLogout();
								setAreUserDetailsShown(false);
							}}
							danger
						>
							<Paragraph fontSize={1.25}>{"Wyloguj"}</Paragraph>
						</Button>
					</Flex>
				)}
			</ul>
		</Flex>
	);
};
