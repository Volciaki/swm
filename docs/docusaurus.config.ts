import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "SWM Documentation",
	favicon: "favicon.ico",
	future: {
		v4: true,
	},
	url: "https://volciaki.palubiak.eu",
	baseUrl: process.env.NODE_ENV === "development" ? "/" : "/docs/",
	organizationName: "volciaki",
	projectName: "primus-inter-pares-2026",
	onBrokenLinks: "throw",
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},
	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					routeBasePath: "/",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		navbar: {
			title: "SWM",
			logo: {
				alt: "Logo SWM",
				src: "logo.png",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "contributingSidebar",
					position: "left",
					label: "Contributing",
				},
				{
					type: "docSidebar",
					sidebarId: "designSidebar",
					position: "left",
					label: "Design",
				},
				{
					href: "https://github.com/volciaki/primus-inter-pares-2026",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			copyright: "Created by Volciaki (2026)",
		},
		colorMode: {
			defaultMode: "dark",
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
