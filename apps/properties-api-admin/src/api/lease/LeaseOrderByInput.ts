import { SortOrder } from "../../util/SortOrder";

export type LeaseOrderByInput = {
  createdAt?: SortOrder;
  endDate?: SortOrder;
  id?: SortOrder;
  propertyId?: SortOrder;
  startDate?: SortOrder;
  tenantId?: SortOrder;
  updatedAt?: SortOrder;
};
