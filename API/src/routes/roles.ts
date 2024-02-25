import { Router } from 'express';
import rolesController from '../controllers/rolesController';
import authenticateToken from '../middleware/authMiddleware.';

const router = Router();

router.get('/', authenticateToken, rolesController.getRoles);

export default router;
