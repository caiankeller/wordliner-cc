import { defineStore } from "pinia";
import type { IHolding } from "types";

import { useHoldingsStore } from "stores/holdings";

export const useTableStore = defineStore("table", () => {
  const holdingsStore = useHoldingsStore();

  const selectedHoldings = ref<Set<IHolding>>(new Set());

  const visibleColumns = ref<Record<keyof IHolding, boolean>>({
    title: true,
    address: false,
    description: false,
    status: true,
    type_of_contract: true,
    id: true,
    hidden: true,
    price: true,
  });

  const selectVisibleColumns = (column: keyof IHolding) => {
    visibleColumns.value = {
      ...visibleColumns.value,
      [column]: !visibleColumns.value[column],
    };
  };

  const isAllChecked = computed(
    () => selectedHoldings.value.size === holdingsStore.holdings.length,
  );

  const selectAllHoldings = () => {
    if (isAllChecked.value)
      selectedHoldings.value.clear();
    else holdingsStore.holdings.map(hd => selectedHoldings.value.add(hd));
  };

  const unselectAllHoldings = () => {
    selectedHoldings.value.clear();
  };

  const selectHoldings = (holding: IHolding) => {
    if (selectedHoldings.value.has(holding))
      selectedHoldings.value.delete(holding);
    else selectedHoldings.value.add(holding);
  };

  return {
    selectAllHoldings,
    selectedHoldings,
    selectHoldings,
    isAllChecked,
    unselectAllHoldings,
    visibleColumns,
    selectVisibleColumns,
  };
});
