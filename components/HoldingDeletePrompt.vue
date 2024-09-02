<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

const { showModal } = defineProps<{ showModal: boolean }>();
const emit = defineEmits<{ (e: "closeModal"): void }>(); // im not quite sure if im doing it right but it does work ✨

const holdingsStore = useHoldingsStore();
const tableStore = useTableStore();

const isDeleting = ref(false);

async function handleDelete() {
  isDeleting.value = true;
  await holdingsStore.deleteHoldings([...tableStore.selectedHoldings]);
  emit("closeModal");
  isDeleting.value = false;
}

function handleModalClose() {
  if (isDeleting.value)
    return;
  emit("closeModal");
}
</script>

<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-10 p-2 bg-black bg-opacity-50 backdrop-blur"
        @click="handleModalClose"
      />
    </transition>
    <transition name="modal-fade">
      <div
        v-if="showModal"
        class="bg-white p-4 z-10 max-w-[350px] absolute mx-auto my-auto top-0 left-0 right-0 bottom-0 w-full rounded-xl shadow-lg h-fit"
      >
        <p class="font-semibold text-neutral-800">
          {{ $t('areYouSureDelete') }}
        </p>
        <div class="my-8 text-center">
          <span class="text-sm font-medium">
            {{ tableStore.selectedHoldings.size }} {{ $t('XItemsSelected') }}
          </span>
        </div>
        <div class="flex justify-end gap-4 mt-4">
          <button
            type="button"
            class="text-neutral-800 active:scale-[.97] hover:underline underline-offset-2 transition-all items-center text-sm font-semibold"
            :disabled="isDeleting"
            @click="handleModalClose"
          >
            {{ $t('cancel') }}
          </button>

          <button
            type="button"
            class="bg-rose-500 text-white active:scale-[.97] transition-all items-center text-sm font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
            :disabled="isDeleting"
            @click="handleDelete"
          >
            <template v-if="isDeleting">
              <ArrowPathIcon class="size-4 animate-spin" />{{ $t('deleting') }}
            </template>
            <template v-else>
              {{ $t('confirmDelete') }}
            </template>
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style>
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  @apply duration-500 opacity-0;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  @apply translate-y-24 scale-95 opacity-0 transition-all duration-200;
}
</style>
