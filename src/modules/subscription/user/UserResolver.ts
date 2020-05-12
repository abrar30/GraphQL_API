import {
  Resolver,
  Query,
  UseMiddleware,
  Arg,
  Mutation,
  Ctx,
  Authorized,
  Args,
} from "type-graphql";
import { SubscriptionUserEntity, LoginResponse } from "./UserEntity";
import { UserInput, LoginInputType } from "./UserInput";
import { getConnection } from "typeorm";
import { AppContext } from "../../../utils/appContext";
import {
  createRefreshToken,
  createAccessToken,
} from "../../../utils/createTokens";
import { isAuth } from "../../../modules/middleware/isAuth";
import { UserLog } from "../../../modules/base/UserLogs";

//import { compare } from "bcryptjs";

@Resolver()
export class SubscriptionUserResolver {
  @Mutation(() => SubscriptionUserEntity)
  async adduser(@Arg("input") input: UserInput) {
    return await SubscriptionUserEntity.create(input).save();
  }

  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async updateUser(
    @Arg("input") input: UserInput,
    @Arg("SubscriptionUserId") SubscriptionUserId: string
  ) {
    const updateUser = await SubscriptionUserEntity.update(
      SubscriptionUserId,
      input
    );
    return updateUser.affected && updateUser.affected > 0 ? true : false;
  }
  @Mutation(() => SubscriptionUserEntity)
  // @UseMiddleware(isAuth)
  async deleteUser(@Arg("SubscriptionUserId") SubscriptionUserId: string) {
    const deleteUser = await SubscriptionUserEntity.delete(SubscriptionUserId);
    return deleteUser.affected && deleteUser.affected > 0 ? true : false;
  }

  @Query(() => [SubscriptionUserEntity])
  @UseMiddleware(isAuth)
  async getUser(@Arg("SubscriptionUserId", { nullable: true }) userId: string) {
    return userId
      ? SubscriptionUserEntity.find({
          where: {
            SubscriptionUserId: userId,
          },
        })
      : // : SubscriptionUserEntity.find({ relations: ["SubscriptionAccount"] });
        SubscriptionUserEntity.find();
  }

  // @Query( () => String)
  // view () {
  //    SubscriptionUserEntity.query('call namestoreproc ')  // Raw sql
  //    getConnection().query('')
  // }

  // Authentication
  @Query(() => String)
  @UseMiddleware(isAuth)
  async loggedIn(@Ctx() { payload }: AppContext) {
    /// call dgraph query
    return "Hello from GraphQL = " + payload?.userId;
  }

  // Authorization
  @Query(() => String)
  //@UseMiddleware(isAuth)
  @Authorized(["ADMIN", "MODERATOR"])
  async authorizedOnly() {
    return "Only Admin or Moderator can access it";
  }

  // Update any userLog Field in Jsonb
  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async updateUserLog(@Arg("id") id: string, @Arg("Fields") audit: UserLog) {
    const update = await SubscriptionUserEntity.query(
      `UPDATE  public."user" SET "UserLog"= "UserLog"|| $1 WHERE "SubscriptionUserId" = $2;`,
      [audit, id]
    );
    console.log(update, "LOL");
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("input") input: LoginInputType, @Ctx() { res }: AppContext) {
    const user = await SubscriptionUserEntity.findOne({
      where: { LoginId: input.LoginId },
    });

    // const valid = await compare(loginInput.password, user.password);

    //  if (!valid) {
    //    throw new Error("Invalid password");
    //  }
    //Referesh Token

    if (!user) {
      throw new Error("Could not find User");
    }
    res.cookie("hrxId", createRefreshToken(user), {
      httpOnly: true,
    });

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  //logout

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: AppContext) {
    res.cookie("hrxId", "", {
      httpOnly: true,
    });
    res.clearCookie("hrxId");
    return true;
  }
}
