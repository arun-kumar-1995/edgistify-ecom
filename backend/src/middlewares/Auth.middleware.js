import { User } from "../models/user.models.js";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";
import { verifyToken } from "../services/jwt.services.js";
import { getEnvVariable } from "../utils/envHelpers.utils.js";
import { HttpCodes } from "../constants/httpCodes.constants.js";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return ErrorHandler(res, 400, "Missing Authorization header", "isAuth");
  }

  // extract the token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return ErrorHandler(res, 401, "Must provide authorization token", "isAuth");
  }

  try {
    // Verify the token
    const secretKey = getEnvVariable("ACCESS_TOKEN_SECRET");

    const decoded = verifyToken(token, secretKey);
    if (!decoded.success) {
      const { statusCode, message, name } = decoded?.code;
      return ErrorHandler(res, statusCode, message, name);
    }

    // find user
    const user = await User.findById(decoded?.data?._id).select(
      "-password -refreshToken"
    );

    if (!user) return ErrorHandler(res, 404, "User not found", "isAuth");
    req.user = user;
    next();
  } catch (err) {
    return ErrorHandler(res, 401, err.message, "ServerError");
  }
};
