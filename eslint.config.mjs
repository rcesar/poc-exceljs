import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import standard from 'eslint-config-standard'


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  standard
];
