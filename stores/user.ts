import { defineStore } from "pinia"
import type { IPreferences, TListingPreference } from "types"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const name = ref("Caian Keller")
  const preference = ref<IPreferences>({ listing: "table" })

  const updateUserPreferenceListing = (
    listingPreference: TListingPreference,
  ) => {
    preference.value.listing = listingPreference
  }

  return {
    name,
    preference,
    updateUserPreferenceListing,
  }
})
