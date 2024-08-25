import type { IProperty } from "~/types";

export default async function deletePropertyAPI(
  propertyReference: string
): Promise<IProperty | "Not found"> {
  const url = new URL(
    `https://66b62752b5ae2d11eb661555.mockapi.io/api/properties/${propertyReference}`
  );

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });

  return await response.json();
}
