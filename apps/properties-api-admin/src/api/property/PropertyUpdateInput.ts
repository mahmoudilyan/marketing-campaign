import { LeaseUpdateManyWithoutPropertiesInput } from "./LeaseUpdateManyWithoutPropertiesInput";
import { OwnerWhereUniqueInput } from "../owner/OwnerWhereUniqueInput";

export type PropertyUpdateInput = {
  address?: string | null;
  leases?: LeaseUpdateManyWithoutPropertiesInput;
  name?: string | null;
  owner?: OwnerWhereUniqueInput | null;
};
