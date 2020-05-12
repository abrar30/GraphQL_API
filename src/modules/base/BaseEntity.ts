import { InterfaceType, Field } from "type-graphql";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UserLog } from "./UserLogs";

// Interface
@InterfaceType()
export abstract class Base extends BaseEntity {
  //uuid
  // @Field() //SDL type inout interface GRAPHQL API
  // @PrimaryGeneratedColumn("uuid")
  // Id: string;

  @Field(() => UserLog, { nullable: true })
  @Column("jsonb", { nullable: true }) // connection to database postgres
  UserLog: UserLog;
}
