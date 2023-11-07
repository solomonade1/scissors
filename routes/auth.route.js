import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controller/auth.controller.js";
import { verify } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/auth/user", verify, getUser);

export default router;
