"use client";

import { useMemo } from "react";
import { routes as routeDefinitions } from "@/utils/routes";
import { Button, Flex, Link, Paragraph } from "@/ui/atoms";
import styles from "./index.module.scss";
import { useAuthData } from "@/ui/providers";

export const NavigationBar = () => {
	const { authData } = useAuthData();
	const isAuthenticated = useMemo(() => authData !== null, [authData])
	const routes = useMemo(
		() => isAuthenticated ? routeDefinitions.loggedIn : routeDefinitions.unauthenticated,
		[isAuthenticated]
	);

	return (
		<Flex align={"center"} justify={"space-between"} style={{ height: "100%" }} fullWidth>
			<Paragraph className={styles["text"]} fontSize={3}>{"SWM"}</Paragraph>

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
					<Paragraph>{authData?.name}</Paragraph>
				)}
			</ul>
		</Flex>
	);
};
