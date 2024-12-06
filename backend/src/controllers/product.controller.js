 
import { CatchAsyncError } from "../middlewares/CatchAsyncError.middleware.js";
import { Product } from "../models/product.models.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { ErrorHandler } from "../utils/ErrorHandler.utils.js";



export const addProduct = CatchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  return ApiResponse(res, 200);
});
