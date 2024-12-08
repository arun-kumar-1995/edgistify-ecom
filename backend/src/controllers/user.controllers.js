import { CatchAsyncError } from "../middlewares/CatchAsyncError.middleware.js";
import { User } from "../models/user.models.js";
import { comparePassword, hashPassword } from "../services/bcrypt.services.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/jwt.services.js";

import { ApiResponse } from "../utils/apiResponse.utils.js";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";
import { SendRefreshToken } from "../utils/sendRefreshToken.utils.js";

// auth controller
export const register = CatchAsyncError(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const isUser = await User.findOne({ email });
  if (isUser) return ErrorHandler(res, 200, "User already exists, Try login");

  // Hash the password
  const hashedPassword = await hashPassword(password);

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
    return ErrorHandler(res, 400, "Both Email and Password must be provided");

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return ErrorHandler(res, 400, "User with this email doesn't exist");

  const match = await comparePassword(password, user.password);
  if (!match) return ErrorHandler(res, 401, "Invalid credentials entered");

  // generate tokens
  const accessToken = generateAccessToken({ _id: user._id });
  const refreshToken = generateRefreshToken({ _id: user._id });

  // send refesh token in cookie and access token in response
  SendRefreshToken(refreshToken);

  // send api response
  ApiResponse(res, 200, "You are logged in", {
    user: { name: user.fullName, email: user.email, id: user._id },
    token: accessToken,
  });
});

export const logout = async () => {
  try {
  } catch (err) {}
};
