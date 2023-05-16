import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/posts";
import { profilesRouter } from "./routers/profiles";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profiles: profilesRouter,
});

export type AppRouter = typeof appRouter;
