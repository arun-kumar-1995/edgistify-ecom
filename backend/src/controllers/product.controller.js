import { isAuthenticated } from "../middlewares/Auth.middleware.js";
import { CatchAsyncError } from "../middlewares/CatchAsyncError.middleware.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";

export const addProduct = CatchAsyncError(async (req, res, next) => {
  return ApiResponse(res, 200);
});
