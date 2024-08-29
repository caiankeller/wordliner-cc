<script setup lang="ts">
import type { IHolding } from "types"

const { holdings } = defineProps<{ holdings: IHolding[] }>()
</script>

<template>
  <!-- nhe, you can use or not unordered list, i think it can enhance SEO sometimes
   so that's why its there -->
  <ul class="grid w-full grid-cols-6 gap-4 mt-4">
    <GridHolding
      v-for="holding in holdings"
      :key="holding.id"
      :holding="holding"
    />
  </ul>
</template>
