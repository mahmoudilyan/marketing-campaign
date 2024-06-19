import { PropertyUpdateManyWithoutOwnersInput } from "./PropertyUpdateManyWithoutOwnersInput";

export type OwnerUpdateInput = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  properties?: PropertyUpdateManyWithoutOwnersInput;
};
