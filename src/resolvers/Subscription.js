import getUserId from "../utils/getUserId";

export const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: { post: { id: postId } }
          }
        },
        info
      );
    }
  },
  post: {
    subscribe(parent, { userId }, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: { author: { id: userId } }
          }
        },
        info
      );
    }
  },
  postByPublish: {
    subscribe(parent, { published }, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: { published }
          }
        },
        info
      );
    }
  },
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId
              }
            }
          }
        },
        info
      );
    }
  }
};
