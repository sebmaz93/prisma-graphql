import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

export default prisma;

// prisma.query.users(null,'{name posts {title} }').then(res => {
//     console.info(JSON.stringify(res,undefined,2))
// })
//
// prisma.query.comments(null,'{text author {name} }').then(res => {
//     console.log(JSON.stringify(res,undefined,2))
// })

// const createPost = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });
//
//   if (!userExists) {
//     throw new Error(`User not found !`);
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{id title body published author{name}}"
//   );
//   return post;
// };

// createPost("ck8ldnpyo00d30860o8gzhuzq", {
//   title: "SEB POST 333",
//   body: "NEW POST BODY 333",
//   published: false
// })
//   .then(res => console.info(JSON.stringify(res, undefined, 2)))
//   .catch(e => console.log(e.message));

// const updatePost = async (postId, data) => {
//   const postExist = await prisma.exists.Post({ id: postId });
//   if (!postExist) {
//     throw new Error("Post not found !");
//   }
//   const post = await prisma.mutation.updatePost(
//     {
//       data: { ...data },
//       where: {
//         id: postId
//       }
//     },
//     "{id title body published author{name}}"
//   );
//   return post;
// };

// updatePost("ck8mjtwpt04no0860hnvmnrlt", {
//   body: "NEW POST BODY updated 2",
//   published: true
// }).then(res => console.info(JSON.stringify(res, undefined, 2))).catch(e => console.log(e.message));
