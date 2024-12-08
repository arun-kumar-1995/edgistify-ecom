import { AsyncThunkWrapper } from "../../utils/asyncThunkWrapper";

// Register async thunk
export const register = AsyncThunkWrapper("auth/register", {
  method: "POST",
  endpoint: "/account/register",
});

export const login = AsyncThunkWrapper("auth/login", {
  method: "POST",
  endpoint: "/account/login",
});
