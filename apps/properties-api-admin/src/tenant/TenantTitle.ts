import { Tenant as TTenant } from "../api/tenant/Tenant";

export const TENANT_TITLE_FIELD = "firstName";

export const TenantTitle = (record: TTenant): string => {
  return record.firstName?.toString() || String(record.id);
};
