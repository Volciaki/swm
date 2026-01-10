export type Route = { text: string; path: string };

export const routes: Route[] = [
	{ text: "Strona Główna", path: "#" },
	{ text: "O nas", path: "#" },
	{ text: "Kontakt", path: "#" }
] as const;