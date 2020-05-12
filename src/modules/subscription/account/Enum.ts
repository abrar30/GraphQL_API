import { registerEnumType } from "type-graphql";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive ",
  Terminated = "Terminated",
}

registerEnumType(UserStatus, {
  name: "UserStatus",
  description: "UserStatus enum for users and account",
});
