<script setup lang="ts">
import { useTableStore } from "stores/table"
import type { IHolding } from "types"
import formatCurrency from "utils/formatCurrency"
import { useModalHolding } from "stores/modalHolding"
import Badge from "./Badge.vue"

const { holding } = defineProps<{ holding: IHolding }>()

const modalHolding = useModalHolding()
const tableStore = useTableStore()

interface TRowData {
  column: keyof IHolding
  content?: string
  class?: string
  props?: Record<typeof Badge.props, string>
  component?: string | typeof Badge
}

// believe me, i dont like it either, but i like less the alternatives for this

function getRows(holding: IHolding): TRowData[] {
  return [
    { column: "title", content: holding.title, class: "text-sm text-nowrap font-medium text-neutral-800", component: "span" },
    { column: "address", content: holding.address, class: "text-xs text-nowrap text-neutral-500 font-medium", component: "span" },
    { column: "description", content: holding.description, class: "text-xs text-nowrap text-neutral-500 font-medium", component: "span" },
    { column: "status", component: Badge, props: { status: holding.status } },
    { column: "type_of_contract", content: holding.type_of_contract, class: "text-xs text-neutral-700 font-medium", component: "span" },
    { column: "id", content: holding.id, class: "text-xs text-neutral-700 font-medium", component: "span" },
    { column: "hidden", content: holding.hidden ? "Hidden" : "Visible", class: "text-xs text-neutral-700 font-medium", component: "span" },
    {
      column: "price",
      class: "text-xs text-nowrap font-semibold text-neutral-800 mt-auto",
      component: "span",
      content: holding.type_of_contract === "selling"
        ? formatCurrency(holding.price)
        : `${formatCurrency(holding.price)} monthly`,
    },
  ]
}
</script>

<template>
  <tr class="transition-colors bg-white hover:bg-neutral-100">
    <td class="w-4 p-4">
      <label class="">
        <input
          type="checkbox"
          :checked="tableStore.selectedHoldings.has(holding)"
          class="w-4 h-4 bg-gray-100 accent-indigo-500 border-neutral-300 rounded-xl focus:ring-indigo-500 focus:ring-2"
          @change="tableStore.selectHoldings(holding)"
        >
      </label>
    </td>
    <td
      v-for="(row, rowIndex) in getRows(holding)"
      :key="rowIndex"
      class="p-4"
      :class="{ hidden: !tableStore.visibleColumns[row.column] }"
    >
      <component :is="row.component" v-bind="row.props" :class="row.class">
        {{
          row.content
        }}
      </component>
    </td>
    <td class="w-4 p-4 text-right">
      <button
        type="button"
        class="space-x-2 text-sm font-medium text-right text-indigo-500 hover:underline underline-offset-2"
        @click="modalHolding.editHolding(holding)"
      >
        Edit
      </button>
    </td>
  </tr>
</template>
