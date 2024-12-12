import { User } from "../models/user.models.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ email }).select("+password");
};

export const updateUserRefreshToken = async (userId, refreshToken) => {
  return User.findByIdAndUpdate(userId, { refreshToken }, { new: true });
};
