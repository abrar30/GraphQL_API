import { InputType, Field } from "type-graphql";
import { SubscriptionAccountEntity } from "./SubscriptionEntity";
import { UserStatus } from "./Enum";
import { UserLog } from "../../../modules/base/UserLogs";

@InputType()
export class SubscriptionAccInput
  implements Partial<SubscriptionAccountEntity> {
  @Field()
  AccountNo: string;

  @Field()
  Name: string;

  @Field()
  ExpiryDate: Date;

  @Field(() => UserStatus, { nullable: true })
  Status: UserStatus;
  @Field(() => UserLog, { nullable: true })
  UserLogs: UserLog;
}
