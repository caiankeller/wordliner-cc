import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
    },
    typescript: true,
    vue: true,
  },
  {
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
);
