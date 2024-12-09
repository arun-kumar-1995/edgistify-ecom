import { getEnvVariable } from "./envHelpers.utils.js";

export const SendRefreshToken = (res, refreshToken) => {
  const expiresIn = getEnvVariable(
    REFRESH_TOKEN_EXPIRE,
    "Missing Env variable REFRESH_TOKEN_EXPIRE"
  );

  res.cookie("_rfs_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresIn * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
};
