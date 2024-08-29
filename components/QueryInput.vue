<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid"
import { useHoldingsStore } from "stores/holdings"

const holdingsStore = useHoldingsStore()
</script>

<template>
  <div class="flex items-center flex-grow">
    <input
      v-model="holdingsStore.filters.query"
      type="search"
      placeholder="Search"
      spellcheck="false"
      class="w-full py-2 text-sm transition-all rounded-full outline outline-1 pl-9 focus:hover:cursor-text peer text-neutral-800 hover:cursor-pointer outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500"
    >
    <MagnifyingGlassIcon
      class="absolute mx-3 transition-colors size-4 text-neutral-500 peer-focus:text-neutral-800"
    />
  </div>
</template>
