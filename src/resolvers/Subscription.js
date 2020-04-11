export const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubSub }) {
      const post = db.posts.find(post => post.id === postId && post.published);
      if (!post) {
        throw new Error("post not found");
      }

      return pubSub.asyncIterator(`comment-${postId}`);
    }
  },
  post: {
    subscribe(parent, { userId }, { db, pubSub }) {
      const user = db.users.find(user => user.id === userId);
      if (!user) {
        throw new Error("user not found");
      }

      return pubSub.asyncIterator(`post-${userId}`);
    }
  }
};
