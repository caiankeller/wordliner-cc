import { createPinia, setActivePinia } from "pinia";
import { usePropertiesStore } from "stores/properties";
import type { IProperty } from "types";
import { beforeEach, describe, expect, it } from "vitest";

const matchingProperties: IProperty = {
  address: expect.any(String),
  description: expect.any(String),
  hidden: expect.any(Boolean),
  id: expect.any(String),
  price: expect.any(Number),
  status: expect.stringMatching(/^(sold|occupied|available)$/),
  title: expect.any(String),
  type_of_contract: expect.stringMatching(/^(renting|selling)$/),
};

describe("managing properties", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should fetch properties successfully", async () => {
    const propertiesStore = usePropertiesStore();
    await propertiesStore.getProperties();

    expect(propertiesStore.properties).toEqual(
      expect.arrayContaining([expect.objectContaining(matchingProperties)])
    );
    expect(propertiesStore.fetching).toBe(false);
    expect(propertiesStore.error).toBe(false);
  });

  //
});

describe("filtering and sorting", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should filter by status (available)", async () => {
    const propertiesStore = usePropertiesStore();
    const previousProperties = propertiesStore.properties;

    propertiesStore.filters.status = "available";

    const MAX_WAIT_TIME = 2500;
    const START_TIME = Date.now();
    while (Date.now() - START_TIME < MAX_WAIT_TIME) {
      if (propertiesStore.properties !== previousProperties) break;

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    expect(
      propertiesStore.properties.every(
        (property) => property.status === propertiesStore.filters.status
      )
    ).toBeTruthy();
  });

  it("should sort by title (price - ascending)", async () => {
    const propertiesStore = usePropertiesStore();
    const previousProperties = propertiesStore.properties;

    propertiesStore.filters.sortBy = "price";
    propertiesStore.filters.sortOrder = "asc";

    const MAX_WAIT_TIME = 2500;
    const START_TIME = Date.now();
    while (Date.now() - START_TIME < MAX_WAIT_TIME) {
      if (propertiesStore.properties !== previousProperties) break;

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const sortedProperties = propertiesStore.properties.sort(
      (propertyA, propertyB) => propertyA.price - propertyB.price
    );

    expect(sortedProperties).toEqual(propertiesStore.properties);
  });

  it("should filter by query", async () => {
    const propertiesStore = usePropertiesStore();
    const previousProperties = propertiesStore.properties;

    propertiesStore.filters.query = "cozy";

    const MAX_WAIT_TIME = 2500;
    const START_TIME = Date.now();
    while (Date.now() - START_TIME < MAX_WAIT_TIME) {
      if (propertiesStore.properties !== previousProperties) break;

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const searchRegex = new RegExp(propertiesStore.filters.query, "i");

    expect(
      propertiesStore.properties.every((property) => {
        return searchRegex.test(
          JSON.stringify(property)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        );
      })
    ).toBeTruthy();
  });
});
