import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createSchema } from "./utils/Schema";
import Express from "express";
import { verify } from "jsonwebtoken";
import { createConnection } from "typeorm";
import { SubscriptionUsersLoader } from "./modules/subscription/account/DataLoader";
import { SubscriptionUserEntity } from "./modules/subscription/user/UserEntity";
import { createRefreshToken, createAccessToken } from "./utils/createTokens";
const server = async () => {
  const { ENDPOINT, ENDPOINT_PORT, ENDPOINT_PATH, ENDPOINT_CORS } = process.env;
  //Establish psql conn
  await createConnection();

  ////####    Middleware Section    ####/////

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }: any) => ({
      req,
      res,
      subscriptionUsersLoader: SubscriptionUsersLoader(),
    }),
  });

  const app = Express();
  app.use(
    cors({
      origin: ENDPOINT_CORS,
      credentials: true,
    })
  );
  app.use(cookieParser());

  //#############   Rest End Point for  Refresh Token     ############# //

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.hrxId;
    if (!token) {
      console.log("token is not valid " + token);
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = await verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }
    console.log("payload :: " + payload.userId);
    //token is valid  and now we have to check against db --> postgres
    const user = await SubscriptionUserEntity.findOne({
      SubscriptionUserId: payload.userId,
    });

    if (!user) {
      console.log("User not found");
      return res.send({ ok: false, accessToken: "" });
    }

    // will have a token version to invoke token
    // if (user.tokenVersion !== payload.tokenVersion) {
    //   return res.send({ ok: false, accessToken: "" });
    // }

    //Referesh Token
    res.cookie("hrxId", createRefreshToken(user), {
      httpOnly: true,
    });

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  apolloServer.applyMiddleware({ app, cors: false, path: ENDPOINT_PATH });

  app.listen(ENDPOINT_PORT, () => {
    console.log(
      `Server started at  ${ENDPOINT}:${ENDPOINT_PORT}${ENDPOINT_PATH}`
    );
  });
};

server().catch((err) => console.trace(err));
