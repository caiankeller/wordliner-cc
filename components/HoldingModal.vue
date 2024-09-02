<script setup lang="ts">
import { ArrowPathIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import type { TStatus, TTypeOfContract } from "types";

const editingHoldingStore = useEditingHoldingStore();

const STATUSES: TStatus[] = ["available", "occupied", "sold"];
const TYPE_OF_CONTRACTS: TTypeOfContract[] = ["renting", "selling"];

function handleModalClose() {
  if (editingHoldingStore.fetching)
    return;
  editingHoldingStore.dismissEditingHolding();
}
</script>

<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div
        v-if="editingHoldingStore.holding !== null"
        class="fixed inset-0 z-10 flex items-center justify-center p-2 bg-black bg-opacity-50 backdrop-blur"
        @click="handleModalClose()"
      />
    </transition>
    <transition name="modal-fade">
      <div
        v-if="editingHoldingStore.holding !== null"
        class="bg-white p-4 max-w-[600px] absolute mx-auto my-auto z-20 top-0 left-0 right-0 bottom-0 w-full sm:rounded-xl sm:shadow-md h-fit"
      >
        <form
          class="flex flex-col gap-4"
          @submit.prevent="editingHoldingStore.saveEditingHolding()"
        >
          <div class="flex items-center justify-between">
            <p class="font-semibold text-neutral-800">
              {{ $t('property') }} - {{ editingHoldingStore.holding.title || $t('noTitle') }}
            </p>
            <button
              type="button"
              class="p-1 transition-colors rounded-full text-neutral-600 hover:text-neutral-900"
              @click="handleModalClose()"
            >
              <XMarkIcon class="size-5" />
              <span class="sr-only">{{ $t('cancel') }}</span>
            </button>
          </div>
          <label class="col-span-2 md:col-span-1">
            <span class="text-sm font-medium text-neutral-800">{{ $t('title') }}</span>
            <div class="flex items-center flex-grow">
              <input
                id="title"
                v-model="editingHoldingStore.holding.title"
                type="text"
                :placeholder="$t('title')"
                spellcheck="false"
                required
                class="w-full p-2 px-4 pl-2 text-sm transition-all ease-out rounded-md outline outline-1 text-neutral-800 outline-neutral-300 focus:outline-neutral-400"
              >
            </div>
          </label>
          <label class="col-span-2 md:col-span-1">
            <span class="text-sm font-medium text-neutral-800">{{ $t('address') }}</span>
            <div class="flex items-center flex-grow">
              <input
                id="address"
                v-model="editingHoldingStore.holding.address"
                type="text"
                :placeholder="$t('address')"
                spellcheck="false"
                required
                class="w-full p-2 px-4 pl-2 text-sm transition-all ease-out rounded-md outline outline-1 text-neutral-800 outline-neutral-300 focus:outline-neutral-400"
              >
            </div>
          </label>
          <label class="col-span-2 md:col-span-1">
            <span class="text-sm font-medium text-neutral-800">{{ $t('description') }}</span>
            <div class="flex items-center flex-grow">
              <textarea
                id="description"
                v-model="editingHoldingStore.holding.description"
                type="text"
                :placeholder="$t('description')"
                required
                class="w-full p-2 px-4 pl-2 text-sm transition-all ease-out rounded-md outline outline-1 text-neutral-800 outline-neutral-300 focus:outline-neutral-400"
              />
            </div>
          </label>

          <div class="grid grid-cols-2 gap-4">
            <label class="col-span-2 md:col-span-1">
              <span class="text-sm font-medium text-neutral-800">{{ $t('status') }}</span>
              <select
                v-model="editingHoldingStore.holding.status"
                class="w-full py-2 pl-2 text-sm transition-shadow bg-white border-r-8 border-transparent rounded-md text-neutral-800 overflow-clip outline outline-1 outline-neutral-300 focus:outline-neutral-400"
              >
                <option v-for="status in STATUSES" :key="status" :value="status">
                  {{ $t(status) }}
                </option>
              </select>
            </label>
            <label class="col-span-2 md:col-span-1">
              <span class="text-sm font-medium text-neutral-800">{{ $t('typeOfContract') }}</span>
              <select
                v-model="editingHoldingStore.holding.type_of_contract"
                class="w-full py-2 pl-2 text-sm transition-shadow bg-white border-r-8 border-transparent rounded-md text-neutral-800 overflow-clip outline outline-1 outline-neutral-300 focus:outline-neutral-400"
              >
                <option v-for="type in TYPE_OF_CONTRACTS" :key="type" :value="type">
                  {{ $t(type) }}
                </option>
              </select>
            </label>
            <label class="col-span-2 md:col-span-1">
              <span class="text-sm font-medium text-neutral-800">{{ $t('price') }}</span>
              <div class="flex items-center flex-grow">
                <CurrencyInput
                  v-model.lazy="editingHoldingStore.holding.price"
                  :options="{ currency: 'EUR' }"
                />
              </div>
            </label>
            <label class="col-span-2 md:col-span-1">
              <span class="text-sm font-medium text-neutral-800">{{ $t('visibility') }}</span>
              <div class="flex gap-2 items-center h-[32px]">
                <input
                  v-model="editingHoldingStore.holding.hidden"
                  type="checkbox"
                  class="w-4 h-4 bg-gray-100 accent-indigo-500 border-neutral-300 rounded-xl focus:ring-indigo-500 focus:ring-2"
                >
                <span class="text-xs font-medium text-neutral-800">{{ $t('hideFromUsers') }}</span>
              </div>
            </label>
          </div>
          <button
            type="submit"
            :disabled="editingHoldingStore.fetching"
            class="bg-indigo-500 text-white active:scale-[.97] transition-all text-sm justify-center items-center font-semibold flex gap-2 py-2 px-4 rounded-md disabled:bg-neutral-400"
          >
            <template v-if="editingHoldingStore.fetching">
              <ArrowPathIcon class="size-4 animate-spin" />{{ $t('saving') }}
            </template>
            <template v-else>
              {{ $t('save') }}
            </template>
          </button>
        </form>
      </div>
    </transition>
  </teleport>
</template>

<style>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  @apply transition-all duration-500 ease-out opacity-100;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  @apply transition-all duration-500 ease-in opacity-0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  @apply transition-all scale-100 opacity-100 translate-y-0 duration-200;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  @apply translate-y-24 scale-95 opacity-0 transition-all duration-200;
}
</style>
