import { Lease } from "../lease/Lease";

export type Tenant = {
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  lease?: Lease | null;
  leases?: Array<Lease>;
  updatedAt: Date;
};
