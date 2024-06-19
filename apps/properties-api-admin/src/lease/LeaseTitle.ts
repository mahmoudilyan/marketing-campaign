import { Lease as TLease } from "../api/lease/Lease";

export const LEASE_TITLE_FIELD = "id";

export const LeaseTitle = (record: TLease): string => {
  return record.id?.toString() || String(record.id);
};
