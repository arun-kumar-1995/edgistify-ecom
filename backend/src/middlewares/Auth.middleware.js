import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";

export const isAuthenticated = async (req, res, next) => {
  let token = null;
  //check for token in headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return ErrorHandler(res, 400, "Not authorized, token is missing");
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    // find user
    const user = await User.findById(decoded);

    // Attach the decoded token (user id) to req.user
    req.user = user;

    next();
  } catch (err) {
    return ApiResponse(res, false, 401, "Invalid token");
  }
};
