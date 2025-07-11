import express from "express";
import {
  createItem,
  delteeItem,
  getAllItems,
  getItemsByCategoryId,
} from "../controllers/item.controller";
const router = express.Router();

router.get("/:id", getItemsByCategoryId);
router.get("/", getAllItems);
router.post("/:id",  createItem);
router.delete("/:id", delteeItem);
export default router;
