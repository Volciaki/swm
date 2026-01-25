import { clsx } from "clsx";
import { useMemo } from "react";
import { routes as routeDefinitions } from "@/utils/routes";
import styles from "./index.module.scss";

export const NavigationBar = () => {
	const isAuthorized = false;
	const routes = useMemo(
		() => isAuthorized ? routeDefinitions.loggedIn : routeDefinitions.unaunthenticated,
		[isAuthorized]
	);

	return (
		<nav className={styles["navbar"]}>
			<div className={styles["title"]}>
				<h1>{"SWM"}</h1>
			</div>

			<li>
				{routes.map((route, index) => (
					<a
						href={route.href}
						className={clsx(
							styles["topbarButton"],
							styles["defaultButton"],
						)}
						key={`route-${index}`}
					>
						{route.text}
					</a>
				))}
			</li>
		</nav>
	);
};
