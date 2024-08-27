<script setup lang="ts">
import { usePropertiesStore } from "stores/properties";
import type { IProperty } from "types";

const propertiesStore = usePropertiesStore();

// the `TABLE_PROPERTIES` array defines the properties of the property object that will be displayed to sort the table (ONLY)
// these properties are specifically relevant to the THIS table's functionality and so completely tied to it
// and may not be suitable for more generic tables.

// while it's a limitation, it's sufficient for the current needs as we don't require a table that can handle
// arbitrary fields like a generic CRM

// TLDR imagine if the user could create field 'owner'. It wouldn't appear here to sort by it :)
// as I said all along the project, this is a large and demanding feature anyway
const TABLE_PROPERTIES: (keyof IProperty)[] = [
  "status",
  "description",
  "hidden",
  "id",
  "price",
  "address",
  "title",
  "type_of_contract",
];
</script>

<template>
  <select v-model="propertiesStore.filters.sortBy" :disabled="propertiesStore.fetching"
    class="rounded-full py-2 pl-4 pr-2 transition-all text-sm text-neutral-800 hover:cursor-pointer border-r-8 border-transparent bg-white outline outline-1 outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500">
    <option v-for="tableProperty in TABLE_PROPERTIES" :key="tableProperty" :value="tableProperty">
      {{ tableProperty.replaceAll("_", " ") }}
    </option>
  </select>
  <select v-model="propertiesStore.filters.sortOrder" :disabled="propertiesStore.fetching"
    class="rounded-full py-2 pl-4 pr-2 transition-all text-sm text-neutral-800 hover:cursor-pointer border-r-8 border-transparent bg-white outline outline-1 outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500">
    <option value="asc">asc</option>
    <option value="desc">desc</option>
  </select>
</template>
