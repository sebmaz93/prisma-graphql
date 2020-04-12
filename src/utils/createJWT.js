import jwt from "jsonwebtoken";

export const generateToken = userId => {
  return jwt.sign({ userId }, "mysecret", { expiresIn: "7 days" });
};
