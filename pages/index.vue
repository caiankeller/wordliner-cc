<script setup lang="ts">
import { useUserStore } from "stores/user"

const holdingsStore = useHoldingsStore()
const userStore = useUserStore()

holdingsStore.getHoldings()
</script>

<template>
  <div class="container">
    <h1 class="text-lg font-bold tracking-tight text-neutral-800">
      Properties
    </h1>
    <Filters />
    <HoldingActions />

    <LoadingHoldings v-if="holdingsStore.fetching" />
    <EmptyHolding v-else-if="!holdingsStore.holdings.length" />

    <template v-if="holdingsStore.holdings.length > 0 && !holdingsStore.fetching">
      <TableHoldings v-if="userStore.preference.listing === 'table'" :holdings="holdingsStore.holdings" />
      <GridHoldings v-else-if="userStore.preference.listing === 'grid'" :holdings="holdingsStore.holdings" />
    </template>

    <div class="flex items-center justify-between my-4">
      <Pagination />
    </div>
  </div>
</template>
