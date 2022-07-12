import express from "express";
import {
  createCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
} from "../controllers/cart.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyUser, updateCart);
router.delete("/:id", verifyUser, deleteCart);
router.get("/find/:userId", verifyUser, getCart);
router.get("/", verifyAdmin, getCarts);

export default router;
