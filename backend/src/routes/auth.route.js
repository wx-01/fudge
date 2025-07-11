import express from 'express';
import { checkAuth, login, logout, signup } from '../controllers/auth.controller';
import { protectedRoute } from '../middleware/auth.middleware';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/checkAuth', protectedRoute, checkAuth);
export default router;