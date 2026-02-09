import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "My Site",
	tagline: "Dinosaurs are cool",
	favicon: "favicon.ico",
	future: {
		v4: true,
	},
	url: "https://your-docusaurus-site.example.com",
	// For example `/docs/`.
	baseUrl: process.env.URL_PREFIX ?? "/",
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
					sidebarId: "tutorialSidebar",
					position: "left",
					label: "Tutorial",
				},
				{
					type: "docSidebar",
					sidebarId: "testSidebar",
					position: "left",
					label: "second",
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
	} satisfies Preset.ThemeConfig,
};

export default config;
