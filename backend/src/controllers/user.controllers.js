import { CatchAsyncError } from "../middlewares/CatchAsyncError.middleware.js";
import { User } from "../models/user.models.js";
import { comparePassword, hashPassword } from "../services/bcrypt.services.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../services/jwt.services.js";

import { ApiResponse } from "../utils/apiResponse.utils.js";
import { getEnvVariable } from "../utils/envHelpers.utils.js";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";
import { SendRefreshToken } from "../utils/sendRefreshToken.utils.js";

// auth controller
export const register = CatchAsyncError(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!email || !password)
    return ErrorHandler(res, 400, "Both Email and Password is required");

  const isUser = await User.findOne({ email }).lean();
  if (isUser) return ErrorHandler(res, 200, "User already exists, Try login");

  // Hash the password
  const hashedPassword = await hashPassword(res, password);

  // Create a new user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  ApiResponse(res, 201, "User registered successfully", { user });
});

export const login = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return ErrorHandler(res, 400, "Both Email and Password is required");

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return ErrorHandler(
      res,
      400,
      `User with this email : ${email} doesn't exist`
    );

  const match = await comparePassword(res, password, user.password);
  if (!match) return ErrorHandler(res, 401, "Invalid credentials entered");

  // generate tokens
  const accessToken = generateAccessToken({ _id: user?._id });
  if (!accessToken.success) {
    const { statusCode, message, name } = accessToken?.code;
    return ErrorHandler(res, statusCode, message, name);
  }

  const refreshToken = generateRefreshToken({ _id: user._id });
  if (!refreshToken.success) {
    const { statusCode, message, name } = accessToken?.code;
    return ErrorHandler(res, statusCode, message, name);
  }

  user.refreshToken = refreshToken?.data || null;
  await user.save();

  // send refesh token in cookie and access token in response
  SendRefreshToken(res, refreshToken?.data);

  // send api response
  ApiResponse(res, 200, "Login Successful", {
    user: {
      name: user.fullName,
      email: user.email,
      id: user._id,
    },
    token: accessToken?.data,
  });
});

export const refreshAccessToken = CatchAsyncError(async (req, res, next) => {
  const refreshToken = req.cookies?._rfs_token;
  if (!refreshToken)
    return ErrorHandler(
      res,
      401,
      "Refresh token not found",
      "MISSING_REFRESH_TOKEN"
    );

  const secretKey = getEnvVariable("REFRESH_TOKEN_SECRET");

  const decoded = verifyToken(refreshToken, secretKey);
  if (!decoded.success) {
    const { statusCode, message, name } = decoded?.code;
    return ErrorHandler(res, statusCode, message, name);
  }

  // Find the user associated with the refresh token
  const user = await User.findById(decoded?.data?._id).lean();
  if (!user) {
    return ErrorHandler(res, 403, "User not found");
  }

  if (user?.refreshToken !== refreshToken) {
    return ErrorHandler(
      res,
      403,
      "Refresh token is incorrect. Try login again",
      "INCORRECT_REFRESH_TOKEN"
    );
  }

  const newAccessToken = generateAccessToken({ _id: user?._id });
  if (!newAccessToken.success) {
    const { statusCode, message, name } = newAccessToken?.code;
    return ErrorHandler(res, statusCode, message, name);
  }

  SendRefreshToken(res, newAccessToken?.data);

  ApiResponse(res, 200, "Access token refreshed", {
    token: newAccessToken?.data,
  });
});

export const logout = CatchAsyncError(async (req, res, next) => {
  // Remove the refresh token from the user's information
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  // clear refresh token inside cookie
  res.clearCookie("_rfs_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return ApiResponse(res, 200, "Successfully logged out", {
    user: {},
    token: null,
  });
});
