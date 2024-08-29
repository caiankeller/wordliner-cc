<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/16/solid"
import type { TStatus, TTypeOfContract } from "types"
import { ref } from "vue"
import { useHoldingsStore } from "~/stores/holdings"

const { showModal } = defineProps<{ showModal: boolean }>()
const emit = defineEmits<{ (e: "closeModal"): void }>()

const holdingsStore = useHoldingsStore()
const tableStore = useTableStore()

const isUpdating = ref(false)

function handleModalClose() {
  // wont let it close the modal if its updating yet
  if (isUpdating.value)
    return
  emit("closeModal")
}

const STATUSES: TStatus[] = ["available", "occupied", "sold"]
const TYPE_OF_CONTRACTS: TTypeOfContract[] = ["renting", "selling"]

const batchUpdate = ref({
  status: STATUSES[0],
  typeOfContract: TYPE_OF_CONTRACTS[0],
  shouldHide: false,
})

async function handleUpdate() {
  isUpdating.value = true
  await holdingsStore.updateHoldings(
    [...tableStore.selectedHoldings],
    batchUpdate.value.status,
    batchUpdate.value.typeOfContract,
    batchUpdate.value.shouldHide,
  )
  emit("closeModal")
  isUpdating.value = false
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
        class="bg-white p-4 z-10 max-w-[600px] absolute mx-auto my-auto top-0 left-0 right-0 bottom-0 w-full rounded-xl shadow-lg h-fit"
      >
        <p class="font-semibold text-neutral-800">
          Batch properties update
        </p>
        <div class="grid grid-cols-2 gap-4 my-8">
          <label class="col-span-2 md:col-span-1">
            <span class="text-sm font-medium text-neutral-800">Status</span>
            <select
              v-model="batchUpdate.status"
              class="w-full py-2 pl-2 text-sm transition-shadow bg-white border-r-8 border-transparent rounded-md text-neutral-800 overflow-clip outline outline-1 outline-neutral-300 focus:outline-neutral-400"
            >
              <option v-for="status in STATUSES" :key="status">
                {{ status }}
              </option>
            </select>
          </label>
          <label class="col-span-2 md:col-span-1">
            <span class="text-sm font-medium text-neutral-800">Type of Contract</span>
            <select
              v-model="batchUpdate.typeOfContract"
              class="w-full py-2 pl-2 text-sm transition-shadow bg-white border-r-8 border-transparent rounded-md text-neutral-800 overflow-clip outline outline-1 outline-neutral-300 focus:outline-neutral-400"
            >
              <option v-for="type in TYPE_OF_CONTRACTS" :key="type">
                {{ type }}
              </option>
            </select>
          </label>
          <div class="col-span-2 md:col-span-1" />
          <label class="col-span-2 md:col-span-1">
            <span class="text-sm font-medium text-neutral-800">Visibility</span>
            <div class="flex gap-2 items-center h-[32px]">
              <input
                v-model="batchUpdate.shouldHide"
                type="checkbox"
                class="w-4 h-4 bg-gray-100 accent-indigo-500 border-neutral-300 rounded-xl focus:ring-indigo-500 focus:ring-2"
              >
              <span class="text-xs font-medium text-neutral-800">Hide from users</span>
            </div>
          </label>
        </div>
        <div class="flex justify-end gap-4">
          <button
            type="button"
            class="text-neutral-800 active:scale-[.97] hover:underline underline-offset-2 transition-all items-center text-sm font-semibold"
            :disabled="isUpdating"
            @click="handleModalClose"
          >
            Cancel
          </button>

          <button
            type="button"
            class="bg-amber-500 text-white active:scale-[.97] transition-all items-center text-sm font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
            :disabled="isUpdating"
            @click="handleUpdate"
          >
            <template v-if="isUpdating">
              <ArrowPathIcon class="size-4 animate-spin" />Updating
            </template>
            <template v-else>
              Confirm update
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
