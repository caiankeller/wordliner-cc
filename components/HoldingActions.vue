<script setup lang="ts">
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/solid";

const editingHoldingStore = useEditingHoldingStore();
const tableStore = useTableStore();

const showDeleteModal = ref(false);
const showUpdateModal = ref(false);
</script>

<template>
  <div class="flex flex-wrap gap-2 mt-3">
    <button
      type="button"
      class="bg-indigo-500 active:scale-[.97] text-white transition-all items-center text-xs z-[1] font-semibold flex gap-2 px-4 py-2 rounded-full"
      @click="editingHoldingStore.newEditingHolding()"
    >
      <PlusCircleIcon class="size-4" /> {{ $t('addProperty') }}
    </button>
    <transition name="button-mount">
      <div
        v-if="tableStore.selectedHoldings.size > 0"
        class="z-0 flex flex-wrap gap-2 transition-all"
      >
        <button
          type="button"
          class="bg-amber-500 active:scale-[.97] text-white transition-all items-center text-xs font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
          @click="showUpdateModal = true"
        >
          <PencilSquareIcon class="size-4" /> {{ $t('batchUpdate') }}
        </button>
        <button
          v-if="tableStore.selectedHoldings.size > 0"
          type="button"
          class="bg-rose-500 active:scale-[.97] text-white transition-all items-center text-xs font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
          @click="showDeleteModal = true"
        >
          <TrashIcon class="size-4" /> {{ $t('delete') }}
        </button>
      </div>
    </transition>
  </div>
  <HoldingDeletePrompt
    :show-modal="showDeleteModal"
    @close-modal="showDeleteModal = false"
  />
  <HoldingBatchUpdatePrompt
    :show-modal="showUpdateModal"
    @close-modal="showUpdateModal = false"
  />
  <HoldingModal />
</template>

<style>
.button-mount-enter-from,
.button-mount-leave-to {
  @apply -translate-x-12 scale-95 opacity-0 transition-all duration-300;
}
</style>
