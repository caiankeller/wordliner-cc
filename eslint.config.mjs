import antfu from "@antfu/eslint-config"

export default antfu(
  {
    type: "app",
    stylistic: {
      indent: 2,
      quotes: "double",
    },
    typescript: true,
    vue: true,
  },
  {
    rules: {
      // what is the hell is this rule lol
      "vue/multi-word-component-names": "off",
    },
  },
)
