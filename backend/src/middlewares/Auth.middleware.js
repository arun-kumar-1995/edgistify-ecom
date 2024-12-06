import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";
import { verifyToken } from "../services/jwt.services.js";

export const isAuthenticated = async (req, res, next) => {
  let token = null;
  //check for token in headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req?.cookies?.token) token = req.cookies.token;

  if (!token) {
    return ErrorHandler(res, 400, "Not authorized, token is missing");
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);
    // find user
    const user = await User.findById(decoded).select("email fullName");
    if (!user) return ErrorHandler(res, 400, "This user doesnot exists");

    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
    // return ErrorHandler(res, 401, "Invalid token");
    next(err)
  }
};
