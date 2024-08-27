<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { usePropertiesStore } from "stores/properties";

const propertiesStore = usePropertiesStore();
</script>

<template>
  <div class="flex-grow flex items-center">
    <input v-model="propertiesStore.filters.query" type="search" placeholder="Search" spellcheck="false"
      class="outline outline-1 w-full pl-9 focus:hover:cursor-text peer text-neutral-800 hover:cursor-pointer outline-neutral-300 text-sm rounded-full p-2 px-4 focus:outline-neutral-500 hover:outline-neutral-500 transition-all">
    <MagnifyingGlassIcon class="mx-3 size-4 absolute text-neutral-500 peer-focus:text-neutral-800 transition-colors" />
  </div>
</template>
