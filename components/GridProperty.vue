<!-- i'm not particularly a fan of this rendering option, 
     so i focused on bringing features to the table option -->

<script setup lang="ts">
import { usePropertyStore } from "stores/property";
import type { IProperty } from "types";
import currencyFormat from "utils/formatCurrency";

const { property } = defineProps<{ property: IProperty }>();

const propertyStore = usePropertyStore();
</script>
<template>
  <li
    class="rounded-xl hover:cursor-pointer space-y-2 p-4 group active:scale-[0.97] hover:shadow-md outline outline-1 outline-neutral-300 hover:outline-neutral-500 lg:col-span-2 md:col-span-3 col-span-6 transition-all"
    @click="propertyStore.selectExistingProperty(property.id)"
  >
    <Badge :status="property.status" />

    <div class="flex justify-between">
      <div>
        <span class="text-sm font-semibold text-neutral-800">
          {{ property.title }}
        </span>
        <span class="text-neutral-600 font-medium text-xs line-clamp-1">
          {{ property.address }}
        </span>
      </div>
      <span
        v-if="property.type_of_contract === 'renting'"
        class="text-xs font-semibold text-neutral-800 mt-auto"
      >
        {{ currencyFormat(property.price) }}
        monthly
      </span>
      <span
        v-if="property.type_of_contract === 'selling'"
        class="text-xs font-semibold text-neutral-800 mt-auto"
      >
        {{ currencyFormat(property.price) }}
      </span>
    </div>
    <hr >
    <span
      class="text-xs leading-relaxed font-medium text-neutral-700 line-clamp-1"
    >
      {{ property.description }}
    </span>
  </li>
</template>
