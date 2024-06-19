import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { LeaseTitle } from "../lease/LeaseTitle";

export const TenantEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="email" source="email" type="email" />
        <TextInput label="firstName" source="firstName" />
        <TextInput label="lastName" source="lastName" />
        <ReferenceInput source="lease.id" reference="Lease" label="Lease">
          <SelectInput optionText={LeaseTitle} />
        </ReferenceInput>
        <ReferenceArrayInput
          source="leases"
          reference="Lease"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={LeaseTitle} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
