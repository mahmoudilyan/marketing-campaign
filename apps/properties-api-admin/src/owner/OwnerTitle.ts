import { Owner as TOwner } from "../api/owner/Owner";

export const OWNER_TITLE_FIELD = "firstName";

export const OwnerTitle = (record: TOwner): string => {
  return record.firstName?.toString() || String(record.id);
};
