import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["_brand-assets/**"],
  },
];

export default eslintConfig;
