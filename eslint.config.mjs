import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// nextVitals includes eslint-config-next’s base preset: React + React Hooks
// (recommended), jsx-a11y, import, and @next/next — no separate react plugin import needed.
const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
	// Last: Prettier as an ESLint rule so the editor ESLint extension shows formatting issues.
	eslintPluginPrettierRecommended,
]);

export default eslintConfig;
