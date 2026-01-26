import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	globalIgnores([".next/**", "dist/**", "next-env.d.ts"]),
	{
		plugins: {
			import: importPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			...prettierConfig.rules,
			"prettier/prettier": "error",
			quotes: ["error", "double", { avoidEscape: true }],
			"import/no-duplicates": "error",
			"object-curly-spacing": ["error", "always"],
			"comma-spacing": ["error", { before: false, after: true }],
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					disallowTypeAnnotations: true,
				},
			],
			"import/order": [
				"error",
				{
					groups: ["external", "builtin", "internal", ["parent", "sibling", "index"]],
				},
			],
		},
	},
]);

export default eslintConfig;
