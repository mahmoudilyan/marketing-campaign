import { LeaseWhereUniqueInput } from "../lease/LeaseWhereUniqueInput";
import { LeaseCreateNestedManyWithoutTenantsInput } from "./LeaseCreateNestedManyWithoutTenantsInput";

export type TenantCreateInput = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  lease?: LeaseWhereUniqueInput | null;
  leases?: LeaseCreateNestedManyWithoutTenantsInput;
};
