import { ObjectType, InputType, Field } from "type-graphql";

@ObjectType()
@InputType("UserLogInput")
export class UserLog {
  @Field({ nullable: true })
  createdDT: string;

  @Field({ nullable: true })
  createdBy: string;

  @Field({ nullable: true })
  modifiedDT: string;

  @Field({ nullable: true })
  modifiedBy: string;

  // @Field({ nullable: true })
  // modifiedDate: UserLog[];
}
