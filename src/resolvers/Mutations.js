import { v4 as uuid } from "uuid";

export const Mutation = {
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

  createPost(parent, args, { db, pubSub }) {
    const isValidID = db.users.some(user => user.id === args.data.author);

    if (!isValidID) {
      throw new Error("User not found");
    }

    const post = {
      id: uuid(),
      ...args.data
    };

    db.posts.push(post);
    pubSub.publish(`post-${args.data.author}`, {
      post: {
        mutation: "CREATED",
        data: post
      }
    });

    return post;
  },
  createComment(parent, args, { db, pubSub }) {
    const userExist = db.users.some(user => user.id === args.data.author);
    const postExist = db.posts.some(
      post => post.id === args.data.post && post.published
    );

    if (!userExist || !postExist) {
      throw new Error("Unable to find user / post");
    }

    const comment = {
      id: uuid(),
      ...args.data
    };

    db.comments.push(comment);

    pubSub.publish(`comment-${args.data.post}`, { comment });
    return comment;
  }
};
