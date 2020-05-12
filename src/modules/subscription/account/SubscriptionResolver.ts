import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx,
} from "type-graphql";
import { SubscriptionAccountEntity } from "./SubscriptionEntity";
import { SubscriptionAccInput } from "./SubscriptionAccInput";
import { SubscriptionUserEntity } from "../user/UserEntity";
import { AppContext } from "../../../utils/appContext";

@Resolver(() => SubscriptionAccountEntity)
export class SubscriptionResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @Query(() => [SubscriptionAccountEntity])
  // @UseMiddleware(isAuth)
  async getSubscriptionAccount(@Arg("id", { nullable: true }) id: string) {
    return id
      ? await SubscriptionAccountEntity.find({
          where: { SubscriptionAccountId: id },
          relations: ["Users"],
        })
      : await SubscriptionAccountEntity.find();
  }

  @FieldResolver()
  async Users(
    @Root() sub: SubscriptionAccountEntity,
    @Ctx() { subscriptionUsersLoader }: AppContext
  ) {
    // return await SubscriptionUserEntity.find({
    //   where: { SubscriptionAccountID: sub.SubscriptionAccountId },
    // });
    return subscriptionUsersLoader.load(sub.SubscriptionAccountId);
  }

  @Mutation(() => SubscriptionAccountEntity)
  async addSubscriptionAcc(@Arg("input") input: SubscriptionAccInput) {
    /// logic
    return await SubscriptionAccountEntity.create(input).save();
  }
}
