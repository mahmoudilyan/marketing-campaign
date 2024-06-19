import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { PropertyWhereUniqueInput } from "../property/PropertyWhereUniqueInput";
import { TenantWhereUniqueInput } from "../tenant/TenantWhereUniqueInput";
import { TenantListRelationFilter } from "../tenant/TenantListRelationFilter";

export type LeaseWhereInput = {
  endDate?: DateTimeNullableFilter;
  id?: StringFilter;
  property?: PropertyWhereUniqueInput;
  startDate?: DateTimeNullableFilter;
  tenant?: TenantWhereUniqueInput;
  tenants?: TenantListRelationFilter;
};
