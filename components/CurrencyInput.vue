<!-- it comes directly from the currencyInput package documentation, with just some changes
  https://dm4t2.github.io/vue-currency-input/guide.html#auto-emit -->

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options);

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      },
    );

    watch(
      () => props.options,
      (options) => {
        setOptions(options);
      },
    );

    return { inputRef };
  },
};
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    inputmode="numeric"
    required
    class="h-[32px] outline outline-1 w-full pl-2 text-neutral-800 outline-neutral-300 text-sm p-2 px-4 focus:outline-neutral-400 transition-all ease-out rounded-md"
  >
</template>
