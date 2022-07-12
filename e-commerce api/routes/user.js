import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  getUserStats,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/find/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getUsers);
router.get("/stats", verifyAdmin, getUserStats);

export default router;
