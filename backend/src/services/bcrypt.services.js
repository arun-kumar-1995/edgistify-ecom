import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

export const hashPassword = async (res, password) => {
  try {
    if (!password || typeof password !== "string") {
      return ErrorHandler(res, 400, "Invalid password provided for hashing.");
    }

    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (err) {
    return ErrorHandler(res, 400, `Error hashing password: ${err.mesage}`);
  }
};

export const comparePassword = async (res, password, userHashPassword) => {
  try {
    if (!password || !userHashPassword)
      return ErrorHandler(res, 400, "Provide Password and hash password");

    return await bcrypt.compare(password, userHashPassword);
  } catch (err) {
    return ErrorHandler(res, 400, `Error comparing passwords: ${err.message}`);
  }
};
