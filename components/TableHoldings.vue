<script setup lang="ts">
import type { IHolding } from "types";

const { holdings } = defineProps<{ holdings: IHolding[] }>();

const tableStore = useTableStore();
</script>

<template>
  <div class="mt-4 overflow-x-auto outline outline-1 outline-neutral-300 rounded-xl">
    <table class="z-10 w-full bg-white table-auto">
      <thead class="py-2 border-b">
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <label class="sr-only">check all checkboxes</label>
              <input
                type="checkbox"
                class="w-4 h-4 bg-gray-100 accent-indigo-500 border-neutral-200 rounded-xl focus:ring-indigo-500 focus:ring-2"
                :checked="tableStore.isAllChecked"
                @change="tableStore.selectAllHoldings"
              >
            </div>
          </th>
          <th
            v-for="(state, column) in tableStore.visibleColumns"
            :key="column"
            class="px-4 text-sm text-left capitalize text-neutral-800 text-nowrap"
            :class="{
              hidden: !state,
            }"
          >
            {{ $t(column) }}
          </th>
          <th class="px-4">
            <DropdownColumnSelect />
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- render rows -->
        <TableHolding
          v-for="holding in holdings"
          :key="holding.id"
          :holding="holding"
        />
      </tbody>
    </table>
  </div>
</template>
