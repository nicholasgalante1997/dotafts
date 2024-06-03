import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {languageOptions: { globals: globals.browser }},
  { ignores: ["src/vendor/*.min.js"] },
  pluginJs.configs.recommended,
];