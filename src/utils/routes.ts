export type Route = { text: string; path: string };

export const navbarRoutes: Route[] = [
	{ text: "Strona Główna", path: "#home" },
	{ text: "O nas", path: "#uwu" },
	{ text: "Kontakt", path: "#delete_this" }
] as const;