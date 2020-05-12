import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { AppContext } from "../../utils/appContext";

// Token base authentication
export const isAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  console.log(authorization);
  if (!authorization) {
    throw new Error("Not Authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.error(err);
    throw new Error("Not Authenticated");
  }
  return next();
};
