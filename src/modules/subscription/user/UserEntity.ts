import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SubscriptionAccountEntity } from "../account/SubscriptionEntity";
import { Base } from "../../../modules/base/BaseEntity";
import { Address } from "../../../modules/base/Address";
import { UserStatus } from "../account/Enum";

@ObjectType({ implements: Base })
@Entity({ name: "SubscriptionUser" })
export class SubscriptionUserEntity extends Base {
  @Field() //SDL type inout interface GRAPHQL API
  @PrimaryGeneratedColumn("uuid")
  SubscriptionUserId: string;

  @Field()
  @Column()
  LoginId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  Avatar: string;

  @Column()
  Password: string;

  @Field(() => Address, { nullable: true })
  @Column("jsonb", { nullable: true })
  Address: Address;

  @Field()
  @Column("bool", { default: false })
  IsActivated: boolean;

  @Field()
  @Column("bool", { default: false })
  IsAdmin: boolean;

  @Field({ defaultValue: "test" })
  test: string;

  @Field(() => UserStatus)
  @Column({ type: "enum", enum: UserStatus, default: UserStatus.Active })
  Status: UserStatus;

  //Customer Reference Column FK
  @Field()
  @Column()
  SubscriptionAccountID: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  EmployeeID: string;

  @Field(() => SubscriptionAccountEntity)
  @ManyToOne(() => SubscriptionAccountEntity)
  @JoinColumn({ name: "SubscriptionAccountID" })
  SubscriptionAccount: SubscriptionAccountEntity;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => SubscriptionUserEntity)
  user: SubscriptionUserEntity;
}
