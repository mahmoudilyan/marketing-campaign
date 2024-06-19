import { Property } from "../property/Property";
import { Tenant } from "../tenant/Tenant";

export type Lease = {
  createdAt: Date;
  endDate: Date | null;
  id: string;
  property?: Property | null;
  startDate: Date | null;
  tenant?: Tenant | null;
  tenants?: Array<Tenant>;
  updatedAt: Date;
};
