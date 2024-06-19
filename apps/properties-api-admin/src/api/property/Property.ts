import { Lease } from "../lease/Lease";
import { Owner } from "../owner/Owner";

export type Property = {
  address: string | null;
  createdAt: Date;
  id: string;
  leases?: Array<Lease>;
  name: string | null;
  owner?: Owner | null;
  updatedAt: Date;
};
