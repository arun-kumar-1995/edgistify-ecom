import express from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
} from "../controllers/user.controllers.js";

const router = express.Router();

// define routes

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
