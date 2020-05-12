import { buildSchema } from "type-graphql";
//import { UserResolver } from "../modules/user/userResolver";
import path from "path";
export const createSchema = () =>
  buildSchema({
    resolvers: [path.join(__dirname, "../modules/**/*Resolver.ts")],
    //dateScalarMode: "isoDate"
    //Authorization.

    authChecker: async (
      { root, args, context, info },
      roles
    ): Promise<boolean> => {
      console.log(context.payload);
      //custom api
      // here we can read the user from context
      // and check his permission in the db against the `roles` argument
      // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
      console.log(roles);
      return false; // or false if access is denied
    },
  });
