import type { IHolding } from "types"

export default async function postHoldingAPI(
  property: Omit<IHolding, "id">,
): Promise<IHolding> {
  const url = "https://66b62752b5ae2d11eb661555.mockapi.io/api/properties"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  }).then(response => response.json())

  return response
}
