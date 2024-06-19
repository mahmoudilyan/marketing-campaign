/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LeaseWhereUniqueInput } from "./LeaseWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { LeaseUpdateInput } from "./LeaseUpdateInput";

@ArgsType()
class UpdateLeaseArgs {
  @ApiProperty({
    required: true,
    type: () => LeaseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => LeaseWhereUniqueInput)
  @Field(() => LeaseWhereUniqueInput, { nullable: false })
  where!: LeaseWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => LeaseUpdateInput,
  })
  @ValidateNested()
  @Type(() => LeaseUpdateInput)
  @Field(() => LeaseUpdateInput, { nullable: false })
  data!: LeaseUpdateInput;
}

export { UpdateLeaseArgs as UpdateLeaseArgs };
