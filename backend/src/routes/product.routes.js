import express from "express";
import { addProduct } from "../controllers/product.controller.js";
import { isAuthenticated } from "../middlewares/Auth.middleware.js";
const router = express.Router();

router.route("/test").post(isAuthenticated, addProduct);
router.route("/add-product").post(isAuthenticated, addProduct);

export default router;
