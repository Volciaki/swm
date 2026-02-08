export type Route = { text: string; href: string };

const home = { text: "Strona główna", href: "/" } as const;
const notifications = { text: "Powiadomienia", href: "/powiadomienia" } as const;
const managementCenter = { text: "Centrum zarządzania", href: "/centrum-zarzadzania" } as const;

export const routes = {
	unauthenticated: [home],
	loggedIn: [home, managementCenter, notifications],
} as const;
