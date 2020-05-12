import DataLoader from "dataloader";
import { SubscriptionAccountEntity } from "./SubscriptionEntity";

//batch call
export const UsersOfSubscription = async (ids: string[]) => {
  const subscriptions = await SubscriptionAccountEntity.createQueryBuilder(
    "sub"
  )
    .leftJoinAndSelect("sub.Users", "SubscriptionUser")
    .where("sub.SubscriptionAccountId IN (:...ids)", { ids })
    .getMany();
  return subscriptions.map((sub) => sub.Users);
};

export const SubscriptionUsersLoader = () =>
  new DataLoader(UsersOfSubscription as any);
