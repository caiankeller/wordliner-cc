<script setup lang="ts">
import { usePropertiesStore } from "stores/properties";
import type { IProperty } from "types";

const { properties } = defineProps<{ properties: IProperty[] }>();

const propertiesStore = usePropertiesStore();
</script>

<template>
  <div class="mt-4 overflow-x-auto outline outline-1 outline-neutral-300 rounded-xl">
    <table class="z-10 w-full table-auto bg-white">
      <thead class="border-b">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input type="checkbox"
                class="h-4 w-4 accent-indigo-500 bg-gray-100 border-neutral-200 rounded-xl focus:ring-indigo-500 focus:ring-2"
                :checked="propertiesStore.isAllChecked" @change="propertiesStore.selectAllProperties">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <!-- Manually handle the columns that are shown to the user. But in larger projects,
                      it would be great to let the user decide what to see -->
          <th class="text-sm px-4 py-2 text-neutral-800 text-left">Title</th>
          <th class="text-sm px-4 py-2 text-neutral-800 text-left">Address</th>
          <th class="text-sm px-4 py-2 text-neutral-800 text-left">Status</th>
          <th class="text-sm px-4 py-2 text-neutral-800 text-left">
            Type of Contract
          </th>
          <th class="text-sm px-4 py-2 text-neutral-800 text-left">Price</th>
          <th class="px-4 py-2 w-4" />
        </tr>
      </thead>
      <tbody>
        <!-- render rows -->
        <TableProperty v-for="property in properties" :key="property.id" :property="property" />
      </tbody>
    </table>
  </div>
</template>
