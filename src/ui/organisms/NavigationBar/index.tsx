import { useMemo } from "react";
import { routes as routeDefinitions } from "@/utils/routes";
import { Button, Flex, Link, Paragraph } from "@/ui/atoms";
import styles from "./index.module.scss";

export const NavigationBar = () => {
	const isAuthorized = false;
	const routes = useMemo(
		() => isAuthorized ? routeDefinitions.loggedIn : routeDefinitions.unaunthenticated,
		[isAuthorized]
	);

	return (
		<Flex className={styles["container"]} align={"center"} justify={"space-between"} fullWidth>
			<Paragraph className={styles["text"]} fontSize={3}>{"SWM"}</Paragraph>

			<ul className={styles["links-container"]}>
				{routes.map((route, index) => (
					<li className={styles["link-item"]} key={`route-${index}`}>
						<Link href={route.href}>
							<Button>
								<Paragraph>{route.text}</Paragraph>
							</Button>
						</Link>
					</li>
				))}
			</ul>
		</Flex>
	);
};
