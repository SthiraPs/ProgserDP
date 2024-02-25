import { Router } from 'express';
import authController from '../controllers/authController';
import authenticateToken from '../middleware/authMiddleware.';

const router = Router();

router.post('/sign-in', authController.signIn);
router.post('/sign-in-with-token', authenticateToken, authController.signInWithToken);
router.post('/mark-user-offline', authController.markUserOffline);

export default router;
