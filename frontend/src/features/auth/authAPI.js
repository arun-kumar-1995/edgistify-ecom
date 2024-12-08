import { AsyncThunkWrapper } from "../../utils/asyncThunkWrapper";

// Register async thunk
export const register = AsyncThunkWrapper("auth/register", {
  method: "POST",
  endpoint: "/account/register",
});
