<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/16/solid";
import { usePropertiesStore } from "stores/properties";
import type { TStatus } from "types";
import { ref } from "vue";

const { showModal } = defineProps<{ showModal: boolean }>()
const emit = defineEmits<{ (e: 'closeModal',): void }>()

const propertiesStore = usePropertiesStore();

const isUpdating = ref(false);

const handleUpdate = async () => {
  isUpdating.value = true;
  await propertiesStore.updatePropertiesStatuses(newStatus.value, shouldHide.value);
  emit('closeModal');
  isUpdating.value = false;
};

const handleModalClose = () => {
  // wont let it close the modal if its deleting yet
  if (isUpdating.value) return;
  emit('closeModal');
}

const STATUSES: TStatus[] = ["available", "occupied", "sold"];

// TODO: capture the most predominant status among those selected
const newStatus = ref(STATUSES[0])
const shouldHide = ref(false)
</script>

<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div v-if="showModal" class="fixed p-2 z-10 backdrop-blur bg-black bg-opacity-50 inset-0"
        @click="handleModalClose" />
    </transition>
    <transition name="modal-fade">
      <div v-if="showModal"
        class="bg-white p-4 z-10 max-w-[350px] absolute mx-auto my-auto top-0 left-0 right-0 bottom-0 w-full rounded-xl shadow-lg h-fit">
        <p class="text-neutral-800 font-semibold">
          Changing properties status
        </p>
        <div class="my-8 flex items-center justify-center gap-4 flex-col">
          <select v-model="newStatus"
            class="rounded-full py-2 pl-4 w-full pr-2 transition-all text-sm text-neutral-800 hover:cursor-pointer border-r-8 border-transparent bg-white outline outline-1 outline-neutral-300 focus:outline-neutral-500 hover:outline-neutral-500">
            <option v-for="status in STATUSES" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <label class="w-full pl-6">
            <span class="text-neutral-800 text-sm font-medium">Visibility</span>
            <div class="flex gap-2 items-center h-[32px]">
              <input v-model="shouldHide" type="checkbox"
                class="h-4 w-4 accent-indigo-500 bg-gray-100 border-neutral-300 rounded-xl focus:ring-indigo-500 focus:ring-2" />
              <span class="text-neutral-800 text-xs font-medium">Hide from users</span>
            </div>
          </label>
        </div>
        <div class="flex justify-end gap-4 mt-4">
          <button type="button"
            class="text-neutral-800 active:scale-[.97] hover:underline underline-offset-2 transition-all items-center text-sm font-semibold"
            :disabled="isUpdating" @click="handleModalClose">
            Cancel
          </button>

          <button type="button"
            class="bg-amber-500 text-white active:scale-[.97] transition-all items-center text-sm font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
            :disabled="isUpdating" @click="handleUpdate">
            <template v-if="isUpdating">
              <ArrowPathIcon class="size-4 animate-spin" />Updating
            </template>
            <template v-else>Confirm update</template>
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
