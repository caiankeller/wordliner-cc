import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import deletePropertyAPI from "services/deletePropertyAPI";
import getPropertiesAPI from "services/getPropertiesAPI.js";
import type { IFilters, IProperty, TStatus } from "types";
import { computed, ref, watch } from "vue";
import updatePropertyAPI from "~/services/updatePropertyAPI";

// this store does not handle adding properties; when a property is added, getProperties is triggered again
// the reason is documented in `propertyStore`

export const usePropertiesStore = defineStore("properties", () => {
  const properties = ref<IProperty[]>([]);
  // selected properties in the table, which can be used for multiple removal of properties or modification...
  const selectedProperties = ref<Set<string>>(new Set());
  const fetching = ref(true);
  // sometimes I think we shouldn't tell the user what the problem is, as they can't fix it
  const error = ref(false);
  const filters = ref<IFilters>({
    query: "",
    sortBy: "status",
    sortOrder: "asc",
    status: "all",
    currentPage: 1,
    pageSize: 10,
  });

  // abstract function for changing pages, quite self-explanatory
  // use either next to go up, or previous to go down
  const updatePage = (operation: "next" | "previous") => {
    const MAX_PAGES = Infinity;
    filters.value.currentPage =
      operation === "next"
        ? filters.value.currentPage + 1
        : filters.value.currentPage - 1;

    // ensure currentPage stays within valid bounds
    // current bounds? none. (1 - infinity)
    filters.value.currentPage = Math.max(
      1,
      Math.min(filters.value.currentPage, MAX_PAGES)
    );
    getProperties();
  };

  // jumps to first page
  const updateToFirstPage = () => {
    filters.value.currentPage = 1;
    getProperties();
  };

  const getProperties = async () => {
    fetching.value = true;
    error.value = false;

    try {
      const response = await getPropertiesAPI(filters.value);
      properties.value = response === "Not found" ? [] : response;
    } catch (_) {
      error.value = true;
    } finally {
      fetching.value = false;
    }
  };

  // it should probably have one store for the table and another for the properties
  // in more advanced uses of the table, such as in other CMOs or more generic CMSs like diretus and twenty
  // this would complicate the design, but for now? it's great this way
  const isAllChecked = computed(
    () => selectedProperties.value.size === properties.value.length
  );

  const selectAllProperties = () => {
    if (isAllChecked.value) selectedProperties.value.clear();
    else
      properties.value.map((property) =>
        selectedProperties.value.add(property.id)
      );
  };

  const selectProperties = (propertyReference: string) => {
    if (selectedProperties.value.has(propertyReference))
      selectedProperties.value.delete(propertyReference);
    else selectedProperties.value.add(propertyReference);
  };

  const removeProperties = async () => {
    const deletePromises = [];

    // ATENTION this code might become problematic if the `pageSize` is increased
    // the number of arguments passed to the `deletePropertyAPI` function will also increase, potentially causing issues
    // ensure that the server can handle a large number of arguments in this scenario
    for (const propertyReference of selectedProperties.value) {
      deletePromises.push(deletePropertyAPI(propertyReference));
    }

    await Promise.all(deletePromises);
    selectedProperties.value.clear();
    getProperties();
  };

  const updatePropertiesStatuses = async (
    status: TStatus,
    shouldHide: boolean
  ) => {
    const updateProperties = [];

    for (const propertyReference of selectedProperties.value) {
      const property: IProperty = {
        ...properties.value.find((p) => p.id === propertyReference)!,
        status,
        hidden: shouldHide,
      };
      updateProperties.push(updatePropertyAPI(property));
    }

    await Promise.all(updateProperties);
    selectedProperties.value.clear();
    getProperties();
  };

  // this code is less verbose, less complicated and you can find everything in one place
  // of course there are many alternatives to this that you can definitely argue and I'd love to hear about it

  // listens to the query value and updates the properties (debounced = performance and optimisation increase)
  watch(
    () => filters.value.query,
    debounce(() => {
      filters.value.currentPage = 1;
      getProperties();
    }, 400)
  );

  // listens to any change on properties to clean selectedproperties
  watch(
    () => properties.value,
    () => selectedProperties.value.clear()
  );

  // listens those filters values and update properties
  // if i made a function for each of them, think of the amount of (repeated) code we'd have
  watch(
    () => [
      filters.value.sortOrder,
      filters.value.status,
      filters.value.sortBy,
      filters.value.pageSize,
    ],
    () => {
      // resets the current page to 1, which is very important for usability purposes
      // these filters can drastically change the number of results, and with fewer pages, user could be on a
      // one that is empty, causing confusion
      filters.value.currentPage = 1;
      getProperties();
    }
  );

  return {
    properties,
    fetching,
    selectProperties,
    error,
    isAllChecked,
    filters,
    getProperties,
    updatePage,
    updateToFirstPage,
    removeProperties,
    selectedProperties,
    updatePropertiesStatuses,
    selectAllProperties,
  };
});
