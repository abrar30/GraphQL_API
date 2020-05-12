import { Request, Response } from "express";
import { SubscriptionUsersLoader } from "../modules/subscription/account/DataLoader";

export interface AppContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
  subscriptionUsersLoader: ReturnType<typeof SubscriptionUsersLoader>;
}
