<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { usePropertyStore } from "stores/property";
import type { TStatus, TTypeOfContract } from "types";

const propertyStore = usePropertyStore();

const STATUSES: TStatus[] = ["available", "occupied", "sold"];
const TYPE_OF_CONTRACTS: TTypeOfContract[] = ["renting", "selling"];
</script>

<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div v-if="propertyStore.property !== null"
        class="fixed p-2 z-10 backdrop-blur bg-black bg-opacity-50 inset-0 flex items-center justify-center"
        @click="propertyStore.dismissCurrrentProperty()" />
    </transition>
    <transition name="modal-fade">
      <div v-if="propertyStore.property !== null"
        class="bg-white p-4 max-w-[600px] absolute mx-auto my-auto z-20 top-0 left-0 right-0 bottom-0 w-full sm:rounded-xl sm:shadow-md h-fit">
        <form class="flex flex-col gap-4" @submit.prevent="propertyStore.saveCurrentProperty()">
          <div class="flex justify-between items-center">
            <p class="text-neutral-800 font-semibold">
              Property - {{ propertyStore.property.title || "No title" }}
            </p>
            <button type="button" class=" text-neutral-600 hover:text-neutral-900 transition-colors p-1 rounded-full"
              @click="propertyStore.dismissCurrrentProperty()">
              <XMarkIcon class="size-5" />
            </button>
          </div>
          <label class="md:col-span-1 col-span-2">
            <span class="text-neutral-800 text-sm font-medium">Title</span>
            <div class="flex-grow flex items-center">
              <input id="title" v-model="propertyStore.property.title" type="text" placeholder="title"
                spellcheck="false" required
                class="outline outline-1 w-full pl-2 text-neutral-800 outline-neutral-300 text-sm p-2 px-4 focus:outline-neutral-400 transition-all ease-out rounded-md" />
            </div>
          </label>
          <label class="md:col-span-1 col-span-2">
            <span class="text-neutral-800 text-sm font-medium">Address</span>
            <div class="flex-grow flex items-center">
              <input id="address" v-model="propertyStore.property.address" type="text" placeholder="address"
                spellcheck="false" required
                class="outline outline-1 w-full pl-2 text-neutral-800 outline-neutral-300 text-sm p-2 px-4 focus:outline-neutral-400 transition-all ease-out rounded-md" />
            </div>
          </label>
          <label class="md:col-span-1 col-span-2">
            <span class="text-neutral-800 text-sm font-medium">Description</span>
            <div class="flex-grow flex items-center">
              <textarea id="description" v-model="propertyStore.property.description" type="text"
                placeholder="description" required
                class="outline outline-1 w-full pl-2 text-neutral-800 outline-neutral-300 text-sm p-2 px-4 focus:outline-neutral-400 transition-all ease-out rounded-md" />
            </div>
          </label>

          <div class="grid grid-cols-2 gap-4">
            <label class="md:col-span-1 col-span-2">
              <span class="text-neutral-800 text-sm font-medium">Status</span>
              <select v-model="propertyStore.property.status"
                class="rounded-md w-full py-2 pl-2 text-sm transition-shadow text-neutral-800 border-r-8 border-transparent bg-white overflow-clip outline outline-1 outline-neutral-300 focus:outline-neutral-400">
                <option v-for="status in STATUSES" :key="status">
                  {{ status }}
                </option>
              </select>
            </label>
            <label class="md:col-span-1 col-span-2">
              <span class="text-neutral-800 text-sm font-medium">Type of Contract</span>
              <select v-model="propertyStore.property.type_of_contract"
                class="rounded-md w-full py-2 pl-2 text-sm transition-shadow text-neutral-800 border-r-8 border-transparent bg-white overflow-clip outline outline-1 outline-neutral-300 focus:outline-neutral-400">
                <option v-for="type in TYPE_OF_CONTRACTS" :key="type">
                  {{ type }}
                </option>
              </select>
            </label>
            <label class="md:col-span-1 col-span-2">
              <span class="text-neutral-800 text-sm font-medium">Price</span>
              <div class="flex-grow flex items-center">
                <CurrencyInput v-model.lazy="propertyStore.property.price" :options="{ currency: 'EUR' }" />
              </div>
            </label>
            <label class="md:col-span-1 col-span-2">
              <span class="text-neutral-800 text-sm font-medium">Visibility</span>
              <div class="flex gap-2 items-center h-[32px]">
                <input v-model="propertyStore.property.hidden" type="checkbox"
                  class="h-4 w-4 accent-indigo-500 bg-gray-100 border-neutral-300 rounded-xl focus:ring-indigo-500 focus:ring-2" />
                <span class="text-neutral-800 text-xs font-medium">Hide from users</span>
              </div>
            </label>
          </div>
          <button type="button" :disabled="propertyStore.fetching"
            class="bg-indigo-500 text-white active:scale-[.97] transition-all text-sm justify-center items-center font-semibold flex gap-2 py-2 px-4 rounded-md disabled:bg-neutral-400">
            <template v-if="propertyStore.fetching">
              <ArrowPathIcon class="size-4 animate-spin" />Saving
            </template>
            <template v-else> Save </template>
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
