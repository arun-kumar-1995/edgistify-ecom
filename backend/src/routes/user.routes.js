import express from "express";
import { register, login, logout } from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/signUp").post(register);
router.route("/signIn").post(login);
router.route("/signOut").post(logout);


export default router;