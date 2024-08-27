<script setup lang="ts">
import { PlusCircleIcon, TrashIcon } from "@heroicons/vue/16/solid";
import { usePropertiesStore } from "stores/properties";
import { usePropertyStore } from "stores/property";

const propertyStore = usePropertyStore();
const propertiesStore = usePropertiesStore();

const showModal = ref(false);
</script>

<template>
    <div class="flex gap-2 mt-3">
        <button
            class="bg-indigo-500 active:scale-[.97] text-white transition-all items-center text-sm font-semibold flex gap-2 px-4 py-2 rounded-full"
            @click="propertyStore.createNewProperty()">
            <PlusCircleIcon class="size-4" /> Add property
        </button>
        <button :disabled="!(propertiesStore.selectedProperties.size > 0)"
            class="bg-rose-500 active:scale-[.97] text-white transition-all items-center text-sm font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
            @click="showModal = true">
            <TrashIcon class="size-4" /> Delete
        </button>
    </div>
    <PropertyModalDelete @closeModal="showModal = false" :showModal="showModal" />
</template>
