import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserInfo } from "../../utils/filterUserInfo";

export const profilesRouter = createTRPCRouter({
  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        emailAddress: [input.email],
      });
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      return filterUserInfo(user);
    }),
});
