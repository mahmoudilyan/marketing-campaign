import { OwnerWhereInput } from "./OwnerWhereInput";
import { OwnerOrderByInput } from "./OwnerOrderByInput";

export type OwnerFindManyArgs = {
  where?: OwnerWhereInput;
  orderBy?: Array<OwnerOrderByInput>;
  skip?: number;
  take?: number;
};
