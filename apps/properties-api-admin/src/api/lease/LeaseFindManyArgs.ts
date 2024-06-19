import { LeaseWhereInput } from "./LeaseWhereInput";
import { LeaseOrderByInput } from "./LeaseOrderByInput";

export type LeaseFindManyArgs = {
  where?: LeaseWhereInput;
  orderBy?: Array<LeaseOrderByInput>;
  skip?: number;
  take?: number;
};
