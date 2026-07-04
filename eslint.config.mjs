import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      "_brand-assets/**",
      "LNDRY_SUPPORTING_FILES/**",
      "lndry_website/**",
      ".agents/**",
      ".claude/**",
      ".impeccable/**",
      ".kiro/**",
      "website-story/**",
      "LNDRY-WEBSITE-FINISHING-KIT/**",
    ],
  },
];

export default eslintConfig;
