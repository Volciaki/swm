export type Route = { text: string; href: string };

const home: Route = { text: "Strona Główna", href: "/" };
const notifications: Route = { text: "Powiadomienia", href: "/powiadomienia" };
const managementCenter: Route = { text: "Centrum zarządzania", href: "/centrum-zarzadzania" };

export const routes = {
	unaunthenticated: [home],
	loggedIn: [home, managementCenter, notifications],
} as const;
