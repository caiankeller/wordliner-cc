<script setup lang="ts">
const holdingsStore = useHoldingsStore();
const tableStore = useTableStore();
</script>

<template>
  <select
    v-model="holdingsStore.filters.sortBy"
    :disabled="holdingsStore.fetching"
    class="py-2 pl-4 pr-2 text-sm transition-all bg-white border-r-8 border-transparent rounded-full text-neutral-800 hover:cursor-pointer outline outline-1 outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500"
  >
    <option
      v-for="(_state, column) in tableStore.visibleColumns"
      :key="column"
      :value="column"
    >
      {{ $t(column) }}
    </option>
  </select>
  <select
    v-model="holdingsStore.filters.sortOrder"
    :disabled="holdingsStore.fetching"
    class="py-2 pl-4 pr-2 text-sm transition-all bg-white border-r-8 border-transparent rounded-full text-neutral-800 hover:cursor-pointer outline outline-1 outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500"
  >
    <option value="asc">
      asc
    </option>
    <option value="desc">
      desc
    </option>
  </select>
</template>
