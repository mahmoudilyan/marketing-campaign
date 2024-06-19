import { PropertyCreateNestedManyWithoutOwnersInput } from "./PropertyCreateNestedManyWithoutOwnersInput";

export type OwnerCreateInput = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  properties?: PropertyCreateNestedManyWithoutOwnersInput;
};
