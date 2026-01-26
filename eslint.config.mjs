import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	globalIgnores([
		".next/**",
		"dist/**",
		"next-env.d.ts",
	]),
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			quotes: ["error", "double", { "avoidEscape": true }],
			indent: ["error", "tab", {
				"ignoredNodes": ["PropertyDefinition[decorators]"]
			}],
			"import/no-duplicates": "error",
			"object-curly-spacing": ["error", "always"],
			"comma-spacing": ["error", { before: false, after: true }],
		},
	},
]);

export default eslintConfig;
