import { ObjectType, InputType, Field } from "type-graphql";

/// GRAPhQL  input and type
@ObjectType()
@InputType("AddressInput")
export class Address {
  @Field({ nullable: true })
  Line1: string;

  @Field({ nullable: true })
  Line2: string;

  @Field({ nullable: true })
  City: string;

  @Field({ nullable: true })
  PostalCode: string;

  @Field({ nullable: true })
  State: string;

  @Field({ nullable: true })
  Country: string;
}
