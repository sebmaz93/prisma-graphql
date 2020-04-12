import getUserId from "../utils/getUserId";

export const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: { published: true }
    };

    if (args.query) {
      opArgs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query }
      ];
    }

    return prisma.query.posts(opArgs, info);
  },
  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const post = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [{ published: true }, { author: { id: userId } }]
      }
    });

    if (post.length === 0) {
      throw new Error("Post not found");
    }

    return post[0];
  },
  comments(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ text_contains: args.query }, {}]
      };
    }

    return prisma.query.comments(opArgs, info);
    // return db.comments;
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({
      where: { id: userId }
    });
  },
  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const opArgs = {
      where: { author: { id: userId } }
    };

    if (args.query) {
      opArgs.where.AND = [
        { title_contains: args.query },
        { body_contains: args.query }
      ];
    }

    return prisma.query.posts(opArgs, info);
  }
};
