import type { IProperty } from "~/types";

export default async function createPropertyAPI(
  property: Omit<IProperty, "id" | "created_date">
): Promise<IProperty> {
  const url = "https://66b62752b5ae2d11eb661555.mockapi.io/api/properties";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  }).then((response) => response.json());

  // this mockapi wont give error
  if (!response.ok) {
    const error = new Error("Failed to create property");
    const status = response.status;

    if (status >= 400 && status < 500) {
      error.message = "Bad request. Please check the property data.";
    } else if (status >= 500) {
      error.message = "Internal server error. Please try again later.";
    }

    throw error;
  }

  return response;
}
