<!-- i'm not particularly a fan of this rendering option,
     so i focused on bringing features to the table option -->

<script setup lang="ts">
import type { IHolding } from "types";
import currencyFormat from "utils/formatCurrency";

const { holding } = defineProps<{ holding: IHolding }>();

const editingHoldingStore = useEditingHoldingStore();
</script>

<template>
  <li
    class="rounded-xl hover:cursor-pointer space-y-2 p-4 group active:scale-[0.97] hover:shadow-md outline outline-1 outline-neutral-300 hover:outline-neutral-500 lg:col-span-3 col-span-6 transition-all"
    @click="editingHoldingStore.editHolding(holding)"
  >
    <Badge :status="holding.status" />
    <div class="flex justify-between">
      <div>
        <span class="text-sm font-semibold text-neutral-800">
          {{ holding.title }}
        </span>
        <span class="text-xs font-medium text-neutral-600 line-clamp-1">
          {{ holding.address }}
        </span>
      </div>
      <span
        v-if="holding.type_of_contract === 'renting'"
        class="mt-auto text-xs font-semibold text-neutral-800"
      >
        {{ currencyFormat(holding.price) }}
        {{ $t('monthly') }}
      </span>
      <span
        v-if="holding.type_of_contract === 'selling'"
        class="mt-auto text-xs font-semibold text-neutral-800"
      >
        {{ currencyFormat(holding.price) }}
      </span>
    </div>
    <hr>
    <span
      class="text-xs font-medium leading-relaxed text-neutral-700 line-clamp-1"
    >
      {{ holding.description }}
    </span>
  </li>
</template>
