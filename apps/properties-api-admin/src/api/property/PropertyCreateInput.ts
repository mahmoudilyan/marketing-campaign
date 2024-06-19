import { LeaseCreateNestedManyWithoutPropertiesInput } from "./LeaseCreateNestedManyWithoutPropertiesInput";
import { OwnerWhereUniqueInput } from "../owner/OwnerWhereUniqueInput";

export type PropertyCreateInput = {
  address?: string | null;
  leases?: LeaseCreateNestedManyWithoutPropertiesInput;
  name?: string | null;
  owner?: OwnerWhereUniqueInput | null;
};
