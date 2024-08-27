<script setup lang="ts">
import { EyeSlashIcon } from "@heroicons/vue/16/solid";
import { usePropertiesStore } from "stores/properties";
import { usePropertyStore } from "stores/property";
import type { IProperty } from "types";
import formatCurrency from "utils/formatCurrency";

const { property } = defineProps<{ property: IProperty }>();

const propertiesStore = usePropertiesStore();
const propertyStore = usePropertyStore();
</script>

<template>
  <tr class="hover:bg-neutral-100 transition-colors bg-white">
    <td class="w-4">
      <label class="p-4 hover:cursor-pointer">
        <input type="checkbox" :checked="propertiesStore.selectedProperties.has(property.id)"
          class="h-4 w-4 accent-indigo-500 bg-gray-100 border-neutral-300 rounded-xl focus:ring-indigo-500 focus:ring-2"
          @change="propertiesStore.selectProperties(property.id)">
      </label>
    </td>
    <td class="p-4 text-sm text-nowrap font-medium text-neutral-800">
      {{ property.title }}
    </td>
    <td class="p-4 text-xs text-nowrap text-neutral-500 font-medium">
      {{ property.address }}
    </td>
    <td class="p-4 flex gap-2 items-center">
      <Badge :status="property.status" />
      <div v-if="property.hidden">
        <span class="sr-only">Property hidden from users</span>
        <EyeSlashIcon class="text-neutral-800 size-4" />
      </div>
    </td>
    <td class="p-4 text-xs text-neutral-700 font-medium">
      {{ property.type_of_contract }}
    </td>
    <td class="p-4">
      <span v-if="property.type_of_contract === 'selling'"
        class="text-xs text-nowrap font-semibold text-neutral-800 mt-auto">
        {{ formatCurrency(property.price) }}
      </span>
      <span v-if="property.type_of_contract === 'renting'"
        class="text-xs text-nowrap font-semibold text-neutral-800 mt-auto">
        {{ formatCurrency(property.price) }}
        monthly
      </span>
    </td>
    <td class="text-right p-4 w-4">
      <button type="button"
        class="text-sm font-medium text-right text-indigo-500 hover:underline underline-offset-2 space-x-2"
        @click="propertyStore.selectExistingProperty(property.id)">
        Edit
      </button>
    </td>
  </tr>
</template>
