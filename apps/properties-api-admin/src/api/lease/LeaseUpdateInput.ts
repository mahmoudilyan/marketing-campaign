import { PropertyWhereUniqueInput } from "../property/PropertyWhereUniqueInput";
import { TenantWhereUniqueInput } from "../tenant/TenantWhereUniqueInput";
import { TenantUpdateManyWithoutLeasesInput } from "./TenantUpdateManyWithoutLeasesInput";

export type LeaseUpdateInput = {
  endDate?: Date | null;
  property?: PropertyWhereUniqueInput | null;
  startDate?: Date | null;
  tenant?: TenantWhereUniqueInput | null;
  tenants?: TenantUpdateManyWithoutLeasesInput;
};
