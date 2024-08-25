import { defineStore } from "pinia";
import type { IPreferences, TListingPreference } from "types";
import { ref } from "vue";

// very basic store to the user entity
// just the options for listing preferences. I wanted to separate the concerns

export const useUserStore = defineStore("user", () => {
  const name = ref("Caian Keller");
  const preference = ref<IPreferences>({ listing: "table" });

  const updateUserPreferenceListing = (
    listingPreference: TListingPreference
  ) => {
    preference.value.listing = listingPreference;
  };

  return {
    name,
    preference,
    updateUserPreferenceListing,
  };
});
