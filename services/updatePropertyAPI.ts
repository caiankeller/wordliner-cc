import type { IProperty } from "~/types";

export default async function updatePropertyAPI(
  updatedProperty: IProperty
): Promise<IProperty> {
  const url = new URL(
    `https://66b62752b5ae2d11eb661555.mockapi.io/api/properties/${updatedProperty.id}`
  );

  const response = await fetch(url.toString(), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedProperty),
  });

  return await response.json();
}
