import { Router } from 'express';
import urgencyController from '../controllers/u';
import authenticateToken from '../middleware/authMiddleware.';

const router = Router();

router.get('/', rolesController.getRoles);

export default router;
