import { defineStore } from "pinia"
import { useHoldingsStore } from "stores/holdings"
import type { IHolding } from "types"
import { ref } from "vue"

import postHoldingAPI from "services/postHoldingAPI"
import putHoldingAPI from "services/putHoldingAPI"

export const useModalHolding = defineStore("modelHolding", () => {
  const holdingsStore = useHoldingsStore()

  const holding = ref<IHolding | null>(null)
  const fetching = ref(false)
  const error = ref<string | null>(null)

  const editHolding = (editHolding?: IHolding | null) => {
    holding.value = editHolding || null
  }

  // create empty holding to add to database yet, therefore mounting the modal
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
    }
  }

  // clear the current holding and therefore unmount the modal
  const dismissEditingHolding = () => {
    holding.value = null
  }

  // will try to UPDATE a holding that is being edited or CREATE it in the database
  const saveEditingHolding = async () => {
    if (!holding.value)
      return
    fetching.value = true
    error.value = null

    try {
      const isNewHolding = holding.value.id === ""

      await (isNewHolding
        ? postHoldingAPI(holding.value)
        : putHoldingAPI(holding.value))
    }
    catch (createError) {
      error.value = createError as string
    }
    finally {
      // reload all the holdings, since adding another one directly to `holdingsStore` would almost certainly
      // have sort problems. All sorting is handled by the backend
      fetching.value = false
      holding.value = null
      holdingsStore.getHoldings()
    }
  }

  // update holdings hidden state when status changes
  watch(
    () => holding.value?.status,
    (newStatus) => {
      if (holding.value)
        holding.value.hidden = newStatus !== "available"
    },
  )

  return {
    holding,
    dismissEditingHolding,
    newEditingHolding,
    editHolding,
    saveEditingHolding,
    fetching,
    error,
  }
})
