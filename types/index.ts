export interface IProperty {
  id: string;
  title: string;
  address: string;
  description: string;
  type_of_contract: TTypeOfContract;
  status: TStatus;
  hidden: boolean;
  price: number;
}

export type TStatus = "available" | "occupied" | "sold";
export type TTypeOfContract = "renting" | "selling";
export type TStatusFilters = TStatus | "all";

export interface IFilters {
  query: string;
  sortBy: keyof IProperty;
  sortOrder: "asc" | "desc";
  status: TStatusFilters;
  currentPage: number;
  pageSize: number;
}

export type TListingPreference = "grid" | "table";

export interface IPreferences {
  listing: TListingPreference;
}
