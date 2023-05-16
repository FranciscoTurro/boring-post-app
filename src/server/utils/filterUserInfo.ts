import type { User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";

export const filterUserInfo = (user: User) => {
  const email = user.externalAccounts[0]?.emailAddress;
  if (!email)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "User doesn't have a valid email address",
    });
  return {
    email,
    id: user.id,
    profilePicture: user.profileImageUrl,
    firstName: user.firstName,
  };
};
