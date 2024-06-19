import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { LeaseWhereUniqueInput } from "../lease/LeaseWhereUniqueInput";
import { LeaseListRelationFilter } from "../lease/LeaseListRelationFilter";

export type TenantWhereInput = {
  email?: StringNullableFilter;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  lease?: LeaseWhereUniqueInput;
  leases?: LeaseListRelationFilter;
};
