import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
  // TODO : CHANGE TO ENV VAR LATER
  secret: "thisismysecret",
  fragmentReplacements
});

export default prisma;
