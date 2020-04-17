import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  // TODO : CHANGE TO ENV VAR LATER
  secret: "thisismysecret",
  fragmentReplacements
});

export default prisma;
