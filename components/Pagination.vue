<script setup lang="ts">
import { BackwardIcon, PlayIcon } from "@heroicons/vue/20/solid";
import { usePropertiesStore } from "stores/properties";

const propertiesStore = usePropertiesStore();
</script>

<!-- there is a limitation on pagination with this mocking api service,
    it doesn't tell you exactly how many pages there are, nor if there is a next page
    so I did it this way, and that's the best I could do -->

<template>
  <div class="flex gap-4 ml-auto items-center">
    <span class="text-neutral-600 font-medium text-xs">9 items per page</span>

    <div class="flex items-center gap-2">
      <button type="button"
        class="rounded-full p-2 group hover:bg-neutral-200 active:scale-[.97] transition-all disabled:bg-neutral-100"
        :disabled="propertiesStore.filters.currentPage === 1" @click="propertiesStore.updateToFirstPage()">
        <BackwardIcon
          class="text-neutral-800 group-hover:text-neutral-950 transition-colors size-4 group-disabled:text-neutral-600" />
      </button>
      <button type="button"
        class="rounded-full p-2 group hover:bg-neutral-200 active:scale-[.97] transition-all disabled:bg-neutral-100"
        :disabled="propertiesStore.filters.currentPage === 1" @click="propertiesStore.updatePage('previous')">
        <!-- I'm actually, pretty proud of this -->
        <PlayIcon
          class="text-neutral-800 rotate-180 group-hover:text-neutral-950 transition-colors size-4 group-disabled:text-neutral-600" />
        <span class="sr-only">Previous page</span>
      </button>
      <span class="text-neutral-700 font-medium text-sm min-w-3 text-center">
        {{ propertiesStore.filters.currentPage }}
      </span>
      <!-- even with the limitation on pagination with this mocking api service, 
                    if we deactivate the button when there are fewer items per page than returned, 
                    we still have a high chance of presume that there is no next page.
                    With the current default value of 9, this is 88% of we being correct 😎
             -->
      <button type="button"
        class="rounded-full p-2 group hover:bg-neutral-200 active:scale-[.97] transition-all disabled:bg-neutral-100"
        :disabled="propertiesStore.properties.length !== propertiesStore.filters.pageSize
          " @click="propertiesStore.updatePage('next')">
        <PlayIcon
          class="text-neutral-800 group-hover:text-neutral-950 transition-colors size-4 group-disabled:text-neutral-600" />
        <span class="sr-only">Next page</span>
      </button>
    </div>
  </div>
</template>
