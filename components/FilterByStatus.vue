<script setup lang="ts">
import type { TStatusFilters } from "types";

const holdingsStore = useHoldingsStore();
const { t } = useI18n();

const STATUSES: TStatusFilters[] = ["all", "available", "occupied", "sold"];
</script>

<template>
  <select
    v-model="holdingsStore.filters.status"
    :disabled="holdingsStore.fetching"
    class="py-2 pl-4 pr-2 text-sm transition-all bg-white border-r-8 border-transparent rounded-full text-neutral-800 hover:cursor-pointer outline outline-1 outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500"
  >
    <option v-for="status of STATUSES" :key="status" :value="status">
      {{ t(status) }}
    </option>
  </select>
</template>
