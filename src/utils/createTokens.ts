import { sign } from "jsonwebtoken";
import { SubscriptionUserEntity } from "src/modules/subscription/user/UserEntity";

//  send to users
export const createAccessToken = (user: SubscriptionUserEntity) => {
  return sign(
    { userId: user.SubscriptionUserId },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );
};

// store in cookie
export const createRefreshToken = (user: SubscriptionUserEntity) => {
  return sign(
    { userId: user.SubscriptionUserId },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
