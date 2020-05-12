import { InputType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { Address } from "../../../modules/base/Address";
import { UserStatus } from "../account/Enum";

@InputType()
export class LoginInputType {
  @Field()
  // @IsEmail()
  LoginId: string;

  @Field()
  @MinLength(3)
  Password: string;
}

@InputType()
export class UserInput {
  @Field()
  LoginId: string;

  @Field({ nullable: true })
  Avatar: string;

  @Field()
  Password: string;

  @Field(() => Address, { nullable: true })
  Address: Address;

  @Field({ nullable: true })
  IsAdmin: boolean;

  @Field(() => UserStatus, { nullable: true })
  Status: UserStatus;

  //Customer Reference Column FK
  @Field()
  SubscriptionAccountID: string;

  @Field({ nullable: true })
  EmployeeID: string;
}
