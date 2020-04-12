import { extractFragmentReplacements } from "prisma-binding";
import { Comment } from "./Comment";
import { Mutation } from "./Mutations";
import { Post } from "./Post";
import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { User } from "./User";

export const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment
};

export const fragmentReplacements = extractFragmentReplacements(resolvers);
