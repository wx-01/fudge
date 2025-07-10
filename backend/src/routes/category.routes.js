import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware';
import { createCategory, deleteCategory, getCategory } from '../controllers/category.controller';
const router = express.Router();

router.get("/", getCategory);
router.post('/',protectedRoute, createCategory);
router.delete("/:id", protectedRoute, deleteCategory);
export default router;