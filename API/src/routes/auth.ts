import { Router } from 'express';
import authController from '../controllers/authController';
import authenticateToken from '../middleware/authMiddleware.';

const router = Router();

router.post('/sign-in', authController.signIn);
router.post('/sign-in-with-token', authenticateToken, authController.signInWithToken);
router.post('/change-user-status', authController.changeUserStatus);

export default router;
