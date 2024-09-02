<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/solid";

const tableStore = useTableStore();

const isOpen = ref(false);
const toggleDropdown = () => (isOpen.value = !isOpen.value);
</script>

<template>
  <div class="relative mt-1 ml-auto max-w-6">
    <button @click="toggleDropdown">
      <PlusCircleIcon
        class="text-indigo-500 transition-transform size-6"
        :class="{ 'rotate-45': isOpen }"
      />
    </button>
    <transition>
      <div v-if="isOpen" class="fixed inset-0" @click="toggleDropdown" />
    </transition>
    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="transition-transform rounded-xl z-10 divide-y items-start flex flex-col justify-start absolute px-3 min-w-[200px] right-0 bg-white outline-1 outline outline-neutral-300"
      >
        <label
          v-for="(_state, property) in tableStore.visibleColumns"
          :key="property"
          class="flex items-start w-full gap-2 py-3 hover:cursor-pointer"
        >
          <input
            :checked="tableStore.visibleColumns[property]"
            type="checkbox"
            class="w-4 h-4 bg-gray-100 accent-indigo-500 border-neutral-300 rounded-xl focus:ring-indigo-500 focus:ring-2"
            @change="tableStore.selectVisibleColumns(property)"
          >
          <span class="text-sm font-medium text-neutral-800">{{ $t(property) }}</span>
        </label>
      </div>
    </transition>
  </div>
</template>

<style>
.dropdown-enter-from,
.dropdown-leave-to {
  @apply translate-y-24 scale-95 opacity-0 transition-all duration-200;
}
</style>
