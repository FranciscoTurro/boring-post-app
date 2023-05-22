import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { addUserDataToComments } from "../../utils/addUserDataToComments";

export const commentsRouter = createTRPCRouter({
  getCommentsById: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: { postId: input.postId },
        orderBy: [{ createdAt: "desc" }],
      });

      return addUserDataToComments(comments);
    }),
  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1).max(140),
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUserId;

      const comment = await ctx.prisma.comment.create({
        data: {
          authorId,
          content: input.content,
          postId: input.postId,
        },
      });

      return comment;
    }),
});
