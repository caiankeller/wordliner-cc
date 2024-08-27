<script setup lang="ts">
import { usePropertiesStore } from "stores/properties";
import type { TStatusFilters } from "types";

const propertiesStore = usePropertiesStore();

const STATUSES: TStatusFilters[] = ["all", "available", "occupied", "sold"];
</script>

<template>
  <select v-model="propertiesStore.filters.status" :disabled="propertiesStore.fetching"
    class="rounded-full py-2 pl-4 pr-2 transition-all text-sm text-neutral-800 hover:cursor-pointer border-r-8 border-transparent bg-white outline outline-1 outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500">
    <option v-for="status in STATUSES" :key="status" :value="status">
      {{ status }}
    </option>
  </select>
</template>
