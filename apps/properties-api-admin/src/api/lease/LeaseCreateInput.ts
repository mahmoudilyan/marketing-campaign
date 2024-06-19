import { PropertyWhereUniqueInput } from "../property/PropertyWhereUniqueInput";
import { TenantWhereUniqueInput } from "../tenant/TenantWhereUniqueInput";
import { TenantCreateNestedManyWithoutLeasesInput } from "./TenantCreateNestedManyWithoutLeasesInput";

export type LeaseCreateInput = {
  endDate?: Date | null;
  property?: PropertyWhereUniqueInput | null;
  startDate?: Date | null;
  tenant?: TenantWhereUniqueInput | null;
  tenants?: TenantCreateNestedManyWithoutLeasesInput;
};
