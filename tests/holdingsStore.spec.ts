import { createPinia, setActivePinia } from "pinia"
import { useHoldingsStore } from "stores/holdings"
import type { IHolding } from "types"
import { beforeEach, describe, expect, it } from "vitest"

const matchingProperties: IHolding = {
  address: expect.any(String),
  description: expect.any(String),
  hidden: expect.any(Boolean),
  id: expect.any(String),
  price: expect.any(Number),
  status: expect.stringMatching(/^(sold|occupied|available)$/),
  title: expect.any(String),
  type_of_contract: expect.stringMatching(/^(renting|selling)$/),
}

describe("managing properties", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("should fetch properties successfully", async () => {
    const holdingsStore = useHoldingsStore()
    await holdingsStore.getHoldings()

    expect(holdingsStore.holdings).toEqual(
      expect.arrayContaining([expect.objectContaining(matchingProperties)]),
    )
    expect(holdingsStore.fetching).toBe(false)
    expect(holdingsStore.error).toBe(false)
  })

  //
})

describe("filtering and sorting", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("should filter by status (available)", async () => {
    const holdingsStore = useHoldingsStore()
    const previousProperties = holdingsStore.holdings

    holdingsStore.filters.status = "available"

    const MAX_WAIT_TIME = 2500
    const START_TIME = Date.now()
    while (Date.now() - START_TIME < MAX_WAIT_TIME) {
      if (holdingsStore.holdings !== previousProperties)
        break

      await new Promise(resolve => setTimeout(resolve, 100))
    }

    expect(
      holdingsStore.holdings.every(
        property => property.status === holdingsStore.filters.status,
      ),
    ).toBeTruthy()
  })

  it("should sort by title (price - ascending)", async () => {
    const holdingsStore = useHoldingsStore()
    const previousProperties = holdingsStore.holdings

    holdingsStore.filters.sortBy = "price"
    holdingsStore.filters.sortOrder = "asc"

    const MAX_WAIT_TIME = 2500
    const START_TIME = Date.now()
    while (Date.now() - START_TIME < MAX_WAIT_TIME) {
      if (holdingsStore.holdings !== previousProperties)
        break

      await new Promise(resolve => setTimeout(resolve, 100))
    }

    const sortedProperties = holdingsStore.holdings.sort(
      (propertyA, propertyB) => propertyA.price - propertyB.price,
    )

    expect(sortedProperties).toEqual(holdingsStore.holdings)
  })

  it("should filter by query", async () => {
    const holdingsStore = useHoldingsStore()
    const previousProperties = holdingsStore.holdings

    holdingsStore.filters.query = "cozy"

    const MAX_WAIT_TIME = 2500
    const START_TIME = Date.now()
    while (Date.now() - START_TIME < MAX_WAIT_TIME) {
      if (holdingsStore.holdings !== previousProperties)
        break

      await new Promise(resolve => setTimeout(resolve, 100))
    }

    const searchRegex = new RegExp(holdingsStore.filters.query, "i")

    expect(
      holdingsStore.holdings.every((property) => {
        return searchRegex.test(
          JSON.stringify(property)
            .normalize("NFD")
            .replace(/[\u0300-\u036F]/g, ""),
        )
      }),
    ).toBeTruthy()
  })
})
