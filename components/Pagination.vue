<script setup lang="ts">
import { BackwardIcon, PlayIcon } from "@heroicons/vue/24/solid";

const holdingsStore = useHoldingsStore();
</script>

<!-- there is a limitation on pagination with this mocking api service,
    it doesn't tell you exactly how many pages there are, nor if there is a next page
    so I did it this way, and that's the best I could do -->

<template>
  <div class="flex items-center gap-2 ml-auto">
    <!-- of course, I could change all that and make the page size never be less than 1, but that's a lot of code for little gain
        Sometimes we have to make a decision based on user experience. Because it works well the way it is now.
        Adding too much manipulation can cause us to lose some of the browsers' native features (or vue features), which are REALLY optimised
        like vmodel.lazy that's being used -->
    <input
      v-model.lazy="holdingsStore.filters.pageSize"
      maxlength="2"
      class="outline-1 outline text-right py-0.5 outline-neutral-300 text-sm focus:outline-neutral-500 px-2 max-w-12 rounded-md"
    >
    <span class="text-xs font-medium text-neutral-600">{{ $t('itemsPerPage') }}</span>
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="rounded-full p-2 group hover:bg-neutral-200 active:scale-[.97] transition-all disabled:bg-neutral-100"
        :disabled="holdingsStore.filters.currentPage === 1"
        @click="holdingsStore.updateToFirstPage()"
      >
        <BackwardIcon
          class="transition-colors text-neutral-800 group-hover:text-neutral-950 size-4 group-disabled:text-neutral-600"
        />
        <span class="sr-only">{{ $t('firstPage') }}</span>
      </button>
      <button
        type="button"
        class="rounded-full p-2 group hover:bg-neutral-200 active:scale-[.97] transition-all disabled:bg-neutral-100"
        :disabled="holdingsStore.filters.currentPage === 1"
        @click="holdingsStore.updatePage('previous')"
      >
        <!-- I'm actually, pretty proud of this -->
        <PlayIcon
          class="transition-colors rotate-180 text-neutral-800 group-hover:text-neutral-950 size-4 group-disabled:text-neutral-600"
        />
        <span class="sr-only">{{ $t('previousPage') }}</span>
      </button>
      <span class="text-sm font-medium text-center text-neutral-700 min-w-3">
        {{ holdingsStore.filters.currentPage }}
      </span>
      <!-- even with the limitation on pagination with this mocking api service,
           if we deactivate the button when there are fewer items per page than returned,
           we still have a high chance of presume that there is no next page.
           With the current default value of 10, this is 88% of we being correct 😎 -->
      <button
        type="button"
        class="rounded-full p-2 group hover:bg-neutral-200 active:scale-[.97] transition-all disabled:bg-neutral-100"
        :disabled="
          holdingsStore.holdings.length.toString() !== holdingsStore.filters.pageSize // damn, thats ugly
        "
        @click="holdingsStore.updatePage('next')"
      >
        <PlayIcon
          class="transition-colors text-neutral-800 group-hover:text-neutral-950 size-4 group-disabled:text-neutral-600"
        />
        <span class="sr-only">{{ $t('nextPage') }}</span>
      </button>
    </div>
  </div>
</template>
