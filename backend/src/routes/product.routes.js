import express from "express";
import { addProduct } from "../controllers/product.controller";
const router = express.Router();

router.route("/add-product").post(addProduct);

export default router;
