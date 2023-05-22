import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/posts";
import { profilesRouter } from "./routers/profiles";
import { commentsRouter } from "./routers/comments";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profiles: profilesRouter,
  comments: commentsRouter,
});

export type AppRouter = typeof appRouter;
