export type Route = { text: string; path: string };

export const defaultRoutes: Route[] = [
	{ text: "Zaloguj Się", path: "#" }
] as const;

export const loggedRoutes: Route[] = [
	{ text: "Panel Główny", path: "#" },
	{ text: "Alerty", path: "#"}
] as const;