import { defineStore } from "pinia";
import type { IHolding } from "types";

// tests wont work if you dont explicitly import stores
import { useHoldingsStore } from "stores/holdings";

import postHoldingAPI from "services/postHoldingAPI";
import putHoldingAPI from "services/putHoldingAPI";

// I decided to use a store for this particular situation because I wanted to have the possibility to
// to use the same form and modal and everything to update or create a new holding
// I've worked at places where we had one modal for updating and another for post
// and it was hell making changes and dealing with duplicate work

export const useEditingHoldingStore = defineStore("editingHolding", () => {
  const holdingsStore = useHoldingsStore();

  const holding = ref<IHolding | null>(null);
  const fetching = ref(false);
  const error = ref<string | null>(null);

  const editHolding = (editHolding?: IHolding | null) => {
    // creates a shallow copy of the selected property to prevent modifying the original object in `holdingsStore`
    // this avoids unintended side effects

    // consider fetching holding from server all again
    holding.value = JSON.parse(JSON.stringify(editHolding)) || null;
  };

  // create empty holding to add to database later, therefore mounting the modal
  const newEditingHolding = () => {
    holding.value = {
      id: "",
      address: "",
      description: "",
      hidden: false,
      status: "available",
      title: "",
      price: 0,
      type_of_contract: "renting",
    };
  };

  // clear the current holding and therefore unmount the modal
  const dismissEditingHolding = () => {
    holding.value = null;
  };

  // will try to UPDATE a holding that is being edited or CREATE it in the database
  const saveEditingHolding = async () => {
    if (!holding.value)
      return;
    fetching.value = true;
    error.value = null;

    try {
      const isNewHolding = holding.value.id === "";

      await (isNewHolding
        ? postHoldingAPI(holding.value)
        : putHoldingAPI(holding.value));
    }
    catch (createError) {
      error.value = createError as string;
    }
    finally {
      // reload all the holdings, since adding another one directly to `holdingsStore` would almost certainly
      // have sort problems. All sorting is handled by the backend
      fetching.value = false;
      holding.value = null;
      holdingsStore.getHoldings();
    }
  };

  // update holdings hidden state when status changes
  watch(
    () => holding.value?.status,
    (newStatus) => {
      if (holding.value)
        holding.value.hidden = newStatus !== "available";
    },
  );

  return {
    holding,
    dismissEditingHolding,
    newEditingHolding,
    editHolding,
    saveEditingHolding,
    fetching,
    error,
  };
});
