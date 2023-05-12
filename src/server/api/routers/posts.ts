import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";

const filterUserInfo = (user: User) => {
  const email = user.externalAccounts[0]?.emailAddress;
  //after adding custom credentials get the scope to get username and replace email with just the username
  if (!email)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "User doesn't have a valid email address",
    });
  return {
    email,
    id: user.id,
    profilePicture: user.profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });
    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserInfo);

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Couldn't find an author for this post",
        });
      return {
        post,
        author,
      };
    });
  }),
});
