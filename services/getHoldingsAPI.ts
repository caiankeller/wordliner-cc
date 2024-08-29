import type { IFilters, IHolding } from "types"

export default async function getHoldings(
  filters: IFilters,
): Promise<IHolding[] | "Not found"> {
  const url = new URL(
    "https://66b62752b5ae2d11eb661555.mockapi.io/api/properties",
  )

  url.searchParams.append("page", filters.currentPage.toString())
  url.searchParams.append("limit", filters.pageSize.toString())
  url.searchParams.append("sortby", filters.sortBy)
  url.searchParams.append("order", filters.sortOrder)

  if (filters.query)
    url.searchParams.append("search", filters.query)

  if (filters.status !== "all")
    url.searchParams.append("status", filters.status)

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { "content-type": "application/json" },
  })

  return await response.json()
}
