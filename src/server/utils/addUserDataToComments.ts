import { clerkClient } from "@clerk/nextjs";
import type { Comment } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { filterUserInfo } from "./filterUserInfo";

export const addUserDataToComments = async (comments: Comment[]) => {
  const userId = comments.map((comment) => comment.authorId);
  const users = (
    await clerkClient.users.getUserList({
      userId,
      limit: 100,
    })
  ).map(filterUserInfo);

  return comments.map((comment) => {
    const author = users.find((user) => user.id === comment.authorId);
    if (!author)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Couldn't find an author for this comment",
      });
    return {
      comment,
      author,
    };
  });
};
