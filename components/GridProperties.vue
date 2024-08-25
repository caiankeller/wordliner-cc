<script setup lang="ts">
import type { IProperty } from "types";

const { properties } = defineProps<{ properties: IProperty[] }>();
</script>

<template>
  <!-- nhe, you can use or not unordered list, i think it can enhance SEO sometimes -->
  <ul class="grid grid-cols-6 mt-4 gap-4 w-full">
    <GridProperty
      v-for="property in properties"
      :key="property.id"
      :property="property"
    />
  </ul>
</template>
