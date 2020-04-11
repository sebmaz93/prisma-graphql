export const Mutation = {
  // USER MUTATIONS
  createUser(parent, args, { prisma }, info) {
    return prisma.mutation.createUser({ data: args.data }, info);
  },
  updateUser(parent, args, { prisma }, info) {
    return prisma.mutation.updateUser(
      { data: args.data, where: { id: args.id } },
      info
    );
  },
  deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
  },

  // POST MUTATIONS
  createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost(
      { data: { ...args.data, author: { connect: { id: args.data.author } } } },
      info
    );
  },
  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      { data: args.data, where: { id: args.id } },
      info
    );
  },
  deletePost(parent, args, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id: args.id } }, info);
  },

  // COMMENT MUTATIONS
  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          ...args.data,
          author: { connect: { id: args.data.author } },
          post: { connect: { id: args.data.post } }
        }
      },
      info
    );
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      { data: { text: args.data.text }, where: { id: args.id } },
      info
    );
  },
  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  }
};
