import { Field, ObjectType, Root } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserStatus } from "./Enum";

import { SubscriptionUserEntity } from "../user/UserEntity";
import { Base } from "../../../modules/base/BaseEntity";

@ObjectType({ implements: Base })
@Entity({ name: "SubscriptionAccount" })
export class SubscriptionAccountEntity extends Base {
  @Field() //SDL type inout interface GRAPHQL API
  @PrimaryGeneratedColumn("uuid")
  SubscriptionAccountId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  AccountNo: string;

  @Field()
  @Column()
  Name: string;

  @Field()
  //@CreateDateColumn({ type: "timestamptz" }) // create
  //@UpdateDateColumn()  // update
  @Column("timestamptz")
  ExpiryDate: Date;

  @Field()
  // @CreateDateColumn() // create
  //@UpdateDateColumn()  // update
  // @Column("timestamptz")
  @CreateDateColumn({ type: "timestamptz" })
  TimeZone: Date;

  @Field(() => UserStatus)
  @Column({ type: "enum", enum: UserStatus, default: UserStatus.Active })
  Status: UserStatus;

  @Field(() => [SubscriptionUserEntity])
  @OneToMany(() => SubscriptionUserEntity, (user) => user.SubscriptionAccount)
  Users: SubscriptionUserEntity[];

  // @Field() name(@Root() parent: SubscriptionAccountEntity): string {
  //     return `${parent.Name} ${parent.AccountNo}`;
  //   }
}
