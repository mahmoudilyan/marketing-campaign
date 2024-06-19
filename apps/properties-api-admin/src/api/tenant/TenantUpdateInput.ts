import { LeaseWhereUniqueInput } from "../lease/LeaseWhereUniqueInput";
import { LeaseUpdateManyWithoutTenantsInput } from "./LeaseUpdateManyWithoutTenantsInput";

export type TenantUpdateInput = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  lease?: LeaseWhereUniqueInput | null;
  leases?: LeaseUpdateManyWithoutTenantsInput;
};
