import { defineStore } from "pinia";
import createPropertyAPI from "services/createPropertyAPI";
import updatePropertyAPI from "services/updatePropertyAPI";
import { usePropertiesStore } from "stores/properties";
import type { IProperty } from "types";
import { ref } from "vue";

export const usePropertyStore = defineStore("property", () => {
  const property = ref<IProperty | null>(null);
  const fetching = ref(false);
  const error = ref<string | null>(null);

  const propertiesStore = usePropertiesStore();

  const selectExistingProperty = (propertyReference: string | null) => {
    // creates a shallow copy of the selected property to prevent modifying the original object in `propertiesStore`
    // this avoids unintended side effects

    // fetching the property again from the server for editing can be considered, but its not necessary rn
    property.value = propertyReference
      ? {
          ...propertiesStore.properties.find(
            (p) => p.id === propertyReference
          )!,
        } || null
      : null;
  };

  // little action to set current editing/adding property to hidden
  // the only thing i handle directly to like this of the property properties
  const setCurrentPropertyHidden = () => {
    if (!property.value) return;
    property.value = { ...property.value, hidden: true };
  };

  // create empty property to add to database yet, therefore mounting the modal
  const createNewProperty = () => {
    property.value = {
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

  // clear the current property and therefore unmount the modal
  const dismissCurrrentProperty = () => {
    property.value = null;
  };

  // will try to UPDATE a property that is being edited or CREATE it in the database
  const saveCurrentProperty = async () => {
    if (!property.value) return;
    fetching.value = true;
    error.value = null;

    try {
      const isNewProperty = property.value.id === "";

      await (isNewProperty
        ? createPropertyAPI(property.value)
        : updatePropertyAPI(property.value));
    } catch (createError) {
      error.value = createError as string;
    } finally {
      // reload all the properties, since adding another one directly to `propertiesStore` would almost certainly
      // have sort problems. All sorting is handled by the backend
      fetching.value = false;
      property.value = null;
      propertiesStore.getProperties();
    }
  };

  // update property hidden state when status changes to sold
  watch(
    () => property.value?.status,
    (newStatus) => {
      if (property.value?.hidden)
        property.value.hidden = newStatus === "available" ? false : true;
    }
  );

  return {
    property,
    setCurrentPropertyHidden,
    selectExistingProperty,
    createNewProperty,
    saveCurrentProperty,
    fetching,
    error,
    dismissCurrrentProperty,
  };
});
