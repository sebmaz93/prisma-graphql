import bcrypt from "bcryptjs";
import { generateToken } from "../utils/createJWT";
import getUserId from "../utils/getUserId";

export const Mutation = {
  // USER MUTATIONS
  async createUser(parent, args, { prisma }) {
    if (args.data.password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const password = await bcrypt.hash(args.data.password, 10);
    const user = await prisma.mutation.createUser({
      data: { ...args.data, password }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async login(parent, args, { prisma }) {
    const user = await prisma.query.user({ where: { email: args.data.email } });

    if (!user) {
      throw new Error("No user found.");
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login.");
    }

    return {
      user,
      token: generateToken(user.id)
    };
  },

  updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.updateUser(
      { data: args.data, where: { id: userId } },
      info
    );
  },
  deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },

  // POST MUTATIONS
  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createPost(
      { data: { ...args.data, author: { connect: { id: userId } } } },
      info
    );
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    });
    const postPublished = await prisma.exists.Post({
      id: args.id,
      published: true
    });

    if (!postExists) {
      throw new Error("Unable to update post");
    }

    if (postPublished && args.data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: { id: args.id }
        }
      });
    }

    return prisma.mutation.updatePost(
      { data: args.data, where: { id: args.id } },
      info
    );
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    });

    if (!postExists) {
      throw new Error("Unable to delete post");
    }

    return prisma.mutation.deletePost({ where: { id: args.id } }, info);
  },

  // COMMENT MUTATIONS
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = prisma.exists.Post({
      id: args.data.post,
      published: true
    });

    if (!postExists) {
      throw new Error("Post does not exist");
    }

    return prisma.mutation.createComment(
      {
        data: {
          ...args.data,
          author: { connect: { id: userId } },
          post: { connect: { id: args.data.post } }
        }
      },
      info
    );
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new Error("comment doesnt exist");
    }
    return prisma.mutation.updateComment(
      { data: { text: args.data.text }, where: { id: args.id } },
      info
    );
  },
  deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new Error("comment doesnt exist");
    }
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
  }
};
