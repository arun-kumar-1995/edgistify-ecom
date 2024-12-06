import { isAuthenticated } from "../middlewares/Auth.middleware"
import { CatchAsyncError } from "../middlewares/CatchAsyncError.middleware"
import { ErrorHandler } from "../utils/ErrorHandler.utils"

ErrorHandler

export const addProduct = CatchAsyncError(async(req , res , next)=>{

})
 