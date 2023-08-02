import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const articleRouter = createTRPCRouter({
  getAllArticles: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany({
      include: {
        comments: true,
        author: true,
      },
    });
  }),
});
