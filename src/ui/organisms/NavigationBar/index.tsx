"use client";

import { useCallback, useMemo, useState } from "react";
import { routes as routeDefinitions } from "@/utils/routes";
import { Button, Flex, Link, Paragraph } from "@/ui/atoms";
import { apiClient, useAuthData } from "@/ui/providers";
import styles from "./index.module.scss";

export const NavigationBar = () => {
	const logout = apiClient.identity.logout.useMutation();
	const { authData, isLoadingAuthData, refreshAuthData } = useAuthData();
	const [areUserDetailsShown, setAreUserDetailsShown] = useState(false);
	const isAuthenticated = useMemo(() => authData !== null, [authData]);
	const routes = useMemo(
		() => (isAuthenticated ? routeDefinitions.loggedIn : routeDefinitions.unauthenticated),
		[isAuthenticated]
	);

	const logoutButtonClickHandler = useCallback(async () => {
		await logout.mutateAsync();
		refreshAuthData();
		setAreUserDetailsShown(false);
	}, [logout, refreshAuthData]);

	if (isLoadingAuthData) return null;

	return (
		<Flex align={"center"} justify={"space-between"} style={{ height: "100%" }} fullWidth>
			<Paragraph className={styles["text"]} fontSize={3}>
				{"SWM"}
			</Paragraph>

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

						<Paragraph fontSize={1.25}>{`Login: ${authData.name}`}</Paragraph>
						<Paragraph fontSize={1.25}>{`Email: ${authData.email}`}</Paragraph>
						<Paragraph fontSize={1.25}>{`Typ konta: ${authData.isAdmin ? "Administrator" : "Użytkownik"}`}</Paragraph>

						<Button onClick={async () => logoutButtonClickHandler()} danger>
							<Paragraph fontSize={1.25}>{"Wyloguj"}</Paragraph>
						</Button>
					</Flex>
				)}
			</ul>
		</Flex>
	);
};
