<script setup lang="ts">
import { QueueListIcon, Squares2X2Icon } from "@heroicons/vue/24/solid";

const userStore = useUserStore();
</script>

<template>
  <div>
    <button
      type="button"
      class="py-2 rounded-l-full h-full px-3 transition-all active:scale-[.97] text-neutral-800 outline outline-1 outline-neutral-300 hover:outline-neutral-500 focus:outline-neutral-500"
      :class="{
        'bg-neutral-800 text-white': userStore.preference.listing === 'table',
      }"
      @click="userStore.updateUserPreferenceListing('table')"
    >
      <QueueListIcon class="size-4" />
      <!-- accessibility sr-only appear for screen readers, good to keep those for buttons that only contain icon -->
      <span class="sr-only">{{ $t('table') }}</span>
    </button>
    <button
      type="button"
      class="py-2 rounded-r-full h-full px-3 transition-all active:scale-[.97] text-neutral-800 outline outline-1 outline-neutral-300 hover:outline-neutral-500 focus:outline-neutral-500"
      :class="{
        'bg-neutral-800 text-white': userStore.preference.listing === 'grid',
      }"
      @click="userStore.updateUserPreferenceListing('grid')"
    >
      <Squares2X2Icon class="size-4" />
      <span class="sr-only">{{ $t('table') }}</span>
    </button>
  </div>
</template>
