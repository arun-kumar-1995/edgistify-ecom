import { getEnvVariable } from "./envHelpers.utils.js";

export const SendRefreshToken = (res, refreshToken) => {
  const refreshTokenExpire = getEnvVariable("REFRESH_TOKEN_COOKIE_EXPIRE");

  res.cookie("_rfs_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: parseInt(refreshTokenExpire, 10) * 60 * 60 * 1000,
    sameSite: "strict",
  });
};
