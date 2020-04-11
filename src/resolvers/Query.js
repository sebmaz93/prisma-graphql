export const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }]
      };
    }

    return prisma.query.users(opArgs, info);
    // if (args.query) {
    //   return db.users.filter(user =>
    //     user.name.toLowerCase().includes(args.query.toLowerCase())
    //   );
    // }
    // return db.users;
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }]
      };
    }

    return prisma.query.posts(opArgs, info);
    // if (args.query) {
    //   return db.posts.filter(post =>
    //     post.title.toLowerCase().includes(args.query.toLowerCase())
    //   );
    // }
    // return db.posts;
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
  me() {
    return {
      id: "123",
      name: "seb",
      email: "sebu@emai.com",
      age: 26
    };
  }
};
