import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

router.post('/sign-in', authController.signIn);
router.post('/sign-in-with-token', authController.signInWithToken);

export default router;
