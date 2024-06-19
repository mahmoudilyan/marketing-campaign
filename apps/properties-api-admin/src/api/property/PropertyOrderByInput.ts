import { SortOrder } from "../../util/SortOrder";

export type PropertyOrderByInput = {
  address?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  ownerId?: SortOrder;
  updatedAt?: SortOrder;
};
