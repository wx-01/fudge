import express from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import {
  createItem,
  delteeItem,
  getAllItems,
  getItemsByCategoryId,
} from "../controllers/item.controller";
const router = express.Router();

router.get("/:id", getItemsByCategoryId);
router.get("/", getAllItems);
router.post("/:id", protectedRoute, createItem);
router.delete("/:id", protectedRoute, delteeItem);
export default router;
