import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { LeaseListRelationFilter } from "../lease/LeaseListRelationFilter";
import { OwnerWhereUniqueInput } from "../owner/OwnerWhereUniqueInput";

export type PropertyWhereInput = {
  address?: StringNullableFilter;
  id?: StringFilter;
  leases?: LeaseListRelationFilter;
  name?: StringNullableFilter;
  owner?: OwnerWhereUniqueInput;
};
