import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { useTableStore } from "stores/table";
import type { IFilters, IHolding, TStatus, TTypeOfContract } from "types";

import deleteHoldingAPI from "services/deleteHoldingAPI";
import getHoldingsAPI from "services/getHoldingsAPI";
import putHoldingAPI from "services/putHoldingAPI";

// this store does not handle adding holdings; when a holding is added, getHoldings is triggered again
// the reason is documented in `modalHoldingStore`

export const useHoldingsStore = defineStore("holdings", () => {
  const tableStore = useTableStore();

  const holdings = ref<IHolding[]>([]);
  const fetching = ref(true);
  // sometimes I think we shouldn't tell the user what the problem is, as they can't fix it
  const error = ref(false);
  const filters = ref<IFilters>({
    query: "",
    sortBy: "status",
    sortOrder: "asc",
    status: "all",
    currentPage: 1,
    pageSize: "10",
  });

  const getHoldings = async () => {
    fetching.value = true;
    error.value = false;

    try {
      const response = await getHoldingsAPI(filters.value);
      holdings.value = response === "Not found" ? [] : response;
    }
    catch (er) {
      error.value = Boolean(er);
    }
    finally {
      fetching.value = false;
    }
  };

  // abstract function for changing pages, quite self-explanatory
  // use either next to go up, or previous to go down
  const updatePage = (operation: "next" | "previous") => {
    const MAX_PAGES = Infinity;
    filters.value.currentPage = operation === "next"
      ? filters.value.currentPage + 1
      : filters.value.currentPage - 1;

    // ensure currentPage stays within valid bounds
    // current bounds? none. (1 - infinity)
    filters.value.currentPage = Math.max(1, Math.min(filters.value.currentPage, MAX_PAGES));
    getHoldings();
  };

  // jumps to first page
  const updateToFirstPage = () => {
    filters.value.currentPage = 1;
    getHoldings();
  };

  const deleteHoldings = async (selectedHoldings: IHolding[]) => {
    // AS I SAID, THIS CODE COULD BE PROBLEMATIC, so i ditched it already
    // i dont think the new solution is the best tho

    // const deletePromises = [];
    // ATENTION this code might become problematic if the `pageSize` is increased
    // the number of arguments passed to the `deleteHoldingAPI` function will also increase, potentially causing issues
    // ensure that the server can handle a large number of arguments in this scenario
    // for (const propertyReference of selectedHoldings) {
    //   deletePromises.push(deleteHoldingAPI(propertyReference.id));
    // }

    // done, let like this for now
    for (const holding of selectedHoldings) {
      await deleteHoldingAPI(holding.id);
      // just a charm for the user, it will count down in the modal
      tableStore.selectHoldings(holding); // will unselect the holding, since its already selected,
    }

    // in this case, i decide to fetch everything again because if i just update the store, it could break it
    getHoldings();
    filters.value.currentPage = 1;
  };

  const updateHoldings = async (
    selectedHoldings: IHolding[],
    status: TStatus,
    typeOfContract: TTypeOfContract,
    shouldHide: boolean,
  ) => {
    // is it hard to understand that hd stands for holding? i dont think so
    for (const holding of selectedHoldings) {
      await putHoldingAPI({
        ...holdings.value.find(hd => hd.id === holding.id)!,
        status,
        type_of_contract: typeOfContract,
        hidden: shouldHide,
      });
    }

    getHoldings();
  };

  // this code is less verbose, less complicated and you can find everything in one place
  // of course there are many alternatives to this that you can definitely argue and I'd love to hear about it

  // listens to the query value and updates the properties (debounced =))
  watch(
    () => filters.value.query,
    debounce(() => {
      filters.value.currentPage = 1;
      getHoldings();
    }, 400),
  );

  watch(
    () => [holdings.value],
    () => {
      tableStore.unselectAllHoldings();
    },
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
      tableStore.unselectAllHoldings();
      filters.value.currentPage = 1;
      getHoldings();
    },
  );

  return {
    holdings,
    fetching,
    error,
    filters,
    getHoldings,
    updatePage,
    updateToFirstPage,
    deleteHoldings,
    updateHoldings,
  };
});
