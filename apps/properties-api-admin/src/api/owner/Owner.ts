import { Property } from "../property/Property";

export type Owner = {
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  properties?: Array<Property>;
  updatedAt: Date;
};
