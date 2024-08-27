<script setup lang="ts">
import { PlusCircleIcon, TrashIcon } from "@heroicons/vue/16/solid";
import { PencilIcon } from "@heroicons/vue/20/solid";
import { usePropertiesStore } from "stores/properties";
import { usePropertyStore } from "stores/property";

const propertyStore = usePropertyStore();
const propertiesStore = usePropertiesStore();

const showDeleteModal = ref(false);
const showUpdateModal = ref(false);
</script>

<template>
    <div class="flex gap-2 flex-wrap mt-3">
        <button type="button"
            class="bg-indigo-500 active:scale-[.97] text-white transition-all items-center text-xs font-semibold flex gap-2 px-4 py-2 rounded-full"
            @click="propertyStore.createNewProperty()">
            <PlusCircleIcon class="size-4" /> Add property
        </button>
        <button type="button" :disabled="!(propertiesStore.selectedProperties.size > 0)"
            class="bg-amber-500 active:scale-[.97] text-white transition-all items-center text-xs font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
            @click="showUpdateModal = true">
            <PencilIcon class="size-4" /> Change status
        </button>
        <button type="button" :disabled="!(propertiesStore.selectedProperties.size > 0)"
            class="bg-rose-500 active:scale-[.97] text-white transition-all items-center text-xs font-semibold flex gap-2 py-2 px-4 rounded-full disabled:bg-neutral-400"
            @click="showDeleteModal = true">
            <TrashIcon class="size-4" /> Delete
        </button>
    </div>
    <PropertyModalDelete @closeModal="showDeleteModal = false" :showModal="showDeleteModal" />
    <PropertyModalUpdateStatus @closeModal="showUpdateModal = false" :showModal="showUpdateModal" />
</template>
