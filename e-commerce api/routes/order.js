import express from "express";
import {
  createOrder,
  deleteOrder,
  getIncome,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyAdmin, updateOrder);
router.delete("/:id", verifyAdmin, deleteOrder);
router.get("/find/:userId", verifyAdmin, getOrder);
router.get("/", verifyAdmin, getOrders);
router.get("/income", verifyAdmin, getIncome);

export default router;
